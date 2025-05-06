"use client";

import { Suspense, useEffect, useState } from "react";
import {
  getAllTasks,
  getNonCompletedTasks,
  getCompletedTasks,
  Task,
} from "@/services/tasks/tasks";
import styles from "./page.module.scss";
import SelectedTask from "@/components/tasks/SelectedTask";
import TasksList from "@/components/tasks/TasksList";
import PaginationControls from "@/components/tasks/PaginationControls";
import SideBarTasks from "@/components/tasks/SideBar";
import { useSearchParams } from "next/navigation";


export default function Home() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <TasksContent />
    </Suspense>
  );
}

function TasksContent() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"todo" | "completed">("todo");
  const [totalPages, setTotalPages] = useState(5);
  const searchParams = useSearchParams();

  const currentPage = searchParams.get("page")
    ? parseInt(searchParams.get("page") as string, 10)
    : 1;
  const pageSize = 5;

  const fetchTasks = async () => {
    try {
      setLoading(true);
      let paginationData;

      if (viewMode === "todo") {
        paginationData = await getNonCompletedTasks(currentPage, pageSize);
      } else if (viewMode === "completed") {
        paginationData = await getCompletedTasks(currentPage, pageSize);
      }

      if (paginationData){
        if ( paginationData.tasks) {
          const tasksArray = Array.isArray(paginationData.tasks) ? paginationData.tasks : [];
          setTasks(tasksArray);
        } else {
          setTasks([]);
        }
        if (paginationData.totalPages){
          setTotalPages(paginationData.totalPages)
        }else{
          setTotalPages(1)
        }
      }
        
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [currentPage, viewMode]);

  const handleViewModeChange = (mode: "todo" | "completed") => {
    setViewMode(mode);
  };

  const handleTaskClick = (taskId: string) => {
    const selected = tasks.find(
      (task) => task.ID?.toString() === taskId.toString()
    );
    if (selected) {
      setSelectedTask(selected);
    }
  };

  const handleCloseTask = () => {
    setSelectedTask(null);
  };

  const saveTask = (updatedTask: Task) => {
    console.log("Saving task:", updatedTask);
    setTasks(
      tasks.map((task: Task) =>
        task.ID === updatedTask.ID ? updatedTask : task
      )
    );
  };

  return loading ? (
    <p>Loading</p>
  ) : (
    <div className={styles.page}>
      <SideBarTasks
        onClick={(mode) => handleViewModeChange(mode as "todo" | "completed")}
      />
      <div className={styles.wrapper}>
        <PaginationControls currentMode={viewMode} totalPages={totalPages} />
        <div className={styles.formPaper}>
          <TasksList
            tasks={tasks || []}
            selectedTask={selectedTask}
            onTaskClick={handleTaskClick}
          />
        </div>
      </div>
      <SelectedTask
        task={selectedTask}
        onClose={handleCloseTask}
        onSave={saveTask}
      />
    </div>
  );
}

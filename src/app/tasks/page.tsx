"use client";

import { useEffect, useState } from "react";
import { getAllTasks, Task } from "@/services/tasks/tasks";
import styles from "./page.module.scss";
import SelectedTask from "@/components/tasks/SelectedTask";
import TasksList from "@/components/tasks/TasksList";
import PaginationControls from "@/components/tasks/PaginationControls";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const tasksData = await getAllTasks();
      console.log(tasksData);
      setTasks(tasksData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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

  const handleChangePage = () => {};

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
    <>
      <div>
        <p>Here will be the nav bar</p>
      </div>
      <div className={styles.wrapper}>
        <PaginationControls
          totalPages={6}
        ></PaginationControls>
        <div className={styles.formPaper}>
          <TasksList
            tasks={tasks}
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
    </>
  );
}

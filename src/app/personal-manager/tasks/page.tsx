"use client";

import { Suspense, useEffect, useState } from "react";
import {
  getAllTasks,
  getNonCompletedTasks,
  getCompletedTasks,
  Task,
  deleteSelectedTasks,
  deleteAllCompletedTasks,
  deleteAllNonCompletedTasks,
} from "@/services/tasks/tasks";
import styles from "./page.module.scss";
import SelectedTask from "@/components/tasks/SelectedTask";
import TasksList from "@/components/tasks/TasksList";
import PaginationControls from "@/components/tasks/PaginationControls";
import SideBarTasks from "@/components/tasks/SideBar";
import DeleteConfirmation from "@/components/tasks/DeleteConfirmation";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";
export default function Tasks() {
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
  const [viewMode, setViewMode] = useState<"todo" | "completed" | "delete">(
    "todo"
  );
  const [selectedTasksForDelete, setSelectedTasksForDelete] = useState<Task[]>(
    []
  );
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [totalPages, setTotalPages] = useState(5);
  const searchParams = useSearchParams();
  const [showDangerZone, setShowDangerZone] = useState(false);

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
      } else if (viewMode === "delete") {
        // In delete mode, fetch all tasks or keep the current filter based on user preference
        paginationData = await getAllTasks(currentPage, pageSize);
      }

      if (paginationData) {
        if (paginationData.tasks) {
          const tasksArray = Array.isArray(paginationData.tasks)
            ? paginationData.tasks
            : [];
          setTasks(tasksArray);
        } else {
          setTasks([]);
        }
        if (paginationData.totalPages) {
          setTotalPages(paginationData.totalPages);
        } else {
          setTotalPages(1);
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

    // Reset selected tasks when view mode changes
    if (viewMode !== "delete") {
      setSelectedTasksForDelete([]);
    }
    // Close the selected task detail view when entering delete mode
    if (viewMode === "delete") {
      setSelectedTask(null);
    }
  }, [currentPage, viewMode]);

  const handleViewModeChange = (mode: "todo" | "completed" | "delete") => {
    setViewMode(mode);
  };

  const handleTaskClick = (taskId: string) => {
    // Don't show task details in delete mode
    if (viewMode === "delete") return;

    const selected = tasks.find(
      (task) => task.ID?.toString() === taskId.toString()
    );
    if (selected) {
      setSelectedTask(selected);
    }
  };

  const handleTaskSelectForDelete = (task: Task) => {
    setSelectedTasksForDelete((prev) => {
      // Check if this task is already selected
      const isSelected = prev.some((t) => t.ID === task.ID);

      if (isSelected) {
        // If selected, remove it from the array
        return prev.filter((t) => t.ID !== task.ID);
      } else {
        // If not selected, add it to the array
        return [...prev, task];
      }
    });
  };

  const handleCloseTask = () => {
    setSelectedTask(null);
  };

  const saveTask = (updatedTask: Task) => {
    // Check if the task should be removed from the current view
    if (viewMode === "completed" && updatedTask.status !== "completed") {
      // Remove task from the list if it's no longer completed
      setTasks(tasks.filter((task) => task.ID !== updatedTask.ID));
    } else if (viewMode === "todo" && updatedTask.status === "completed") {
      // Remove task from the list if it's now completed but we're in todo mode
      setTasks(tasks.filter((task) => task.ID !== updatedTask.ID));
    } else {
      // Update the task in the current list
      setTasks(
        tasks.map((task: Task) =>
          task.ID === updatedTask.ID ? updatedTask : task
        )
      );
    }
  };
  const handleDeleteSelected = () => {
    if (selectedTasksForDelete.length > 0) {
      setShowDeleteConfirmation(true);
    }
  };
  const handleClearCompleted = async () => {
    if (window.confirm("Are you sure you want to clear all completed tasks?")) {
      try {
        setLoading(true);
        await deleteAllCompletedTasks();
        await fetchTasks();
      } catch (error) {
        console.error("Error clearing completed tasks:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteAllNonCompleted = async () => {
    if (
      window.confirm(
        "⚠️ WARNING: This will delete ALL of your tasks. This action cannot be undone."
      )
    ) {
      try {
        setLoading(true);
        await deleteAllNonCompletedTasks();
        await fetchTasks();
      } catch (error) {
        console.error("Error deleting all tasks:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const confirmDelete = async () => {
    try {
      setLoading(true);
      // Extract the IDs from selectedTasksForDelete
      const taskIds = selectedTasksForDelete.map(
        (task) => task.ID?.toString() || ""
      );
      // Delete all selected tasks with one API call
      await deleteSelectedTasks(taskIds);

      // Refresh the task list
      await fetchTasks();

      // Reset the state
      setSelectedTasksForDelete([]);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return loading ? (
    <p>Loading</p>
  ) : (
    <div className={styles.page}>
      <SideBarTasks
        onClick={(mode) =>
          handleViewModeChange(mode as "todo" | "completed" | "delete")
        }
        activeMode={viewMode}
      />
      <div className={styles.wrapper}>
        {viewMode !== "delete" && (
          <PaginationControls currentMode={viewMode} totalPages={totalPages} />
        )}

        {viewMode === "delete" && (
          <div className={styles.deleteControls}>
            <span>{selectedTasksForDelete.length} tasks selected</span>
            <Button
              text="Delete Selected"
              onClick={handleDeleteSelected}
              disabled={selectedTasksForDelete.length === 0}
            />
          </div>
        )}

        <div className={styles.formPaper}>
          <TasksList
            tasks={tasks || []}
            selectedTask={selectedTask}
            onTaskClick={handleTaskClick}
            isDeleteMode={viewMode === "delete"}
            selectedTasksForDelete={selectedTasksForDelete}
            onTaskSelectForDelete={handleTaskSelectForDelete}
          />
        </div>
      </div>
      {viewMode === "todo" && (
        <div className={styles.dangerZoneContainer}>
          <button
            className={styles.dangerZoneToggle}
            onClick={() => setShowDangerZone(!showDangerZone)}
          >
            Delete All Non Completed
          </button>

          {showDangerZone && (
            <div className={styles.dangerZonePanel}>
              <p>These actions cannot be undone</p>
              <Button
                text="Delete All Tasks"
                onClick={handleDeleteAllNonCompleted}
              />
            </div>
          )}
        </div>
      )}
      {viewMode === "completed" && tasks.length > 0 && (
        <div className={styles.clearCompletedContainer}>
          <Button text="Clear Completed Tasks" onClick={handleClearCompleted} />
        </div>
      )}
      {selectedTask && (
        <SelectedTask
          task={selectedTask}
          onClose={handleCloseTask}
          onSave={saveTask}
        />
      )}
      {showDeleteConfirmation && (
        <DeleteConfirmation
          selectedTasks={selectedTasksForDelete}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

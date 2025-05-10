import { Task } from "@/services/tasks/tasks";
import styles from "./styles/TasksList.module.scss";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TasksListProps {
  tasks: Task[];
  selectedTask: Task | null;
  onTaskClick: (taskId: string) => void;
  isDeleteMode: boolean;
  selectedTasksForDelete: Task[];
  onTaskSelectForDelete: (task: Task) => void;
}

const TasksList = ({
  tasks,
  selectedTask,
  onTaskClick,
  isDeleteMode,
  selectedTasksForDelete,
  onTaskSelectForDelete,
}: TasksListProps) => {
  const router = useRouter();
  const [animatingTaskId, setAnimatingTaskId] = useState<string | null>(null);
  const [returningTaskId, setReturningTaskId] = useState<string | null>(null);

  const handleClick = () => {
    router.push("/tasks/create");
  };

  const handleTaskClick = (task: Task) => {
    if (isDeleteMode) {
      onTaskSelectForDelete(task);
      return;
    }

    const taskId = task.ID?.toString() || "";
    setAnimatingTaskId(taskId);

    setTimeout(() => {
      if (selectedTask?.ID) {
        setReturningTaskId(selectedTask.ID.toString());
      }

      onTaskClick(taskId);
      setAnimatingTaskId(null);
    }, 500);
  };

  // Reset returning task ID when selected task changes
  useEffect(() => {
    if (selectedTask === null && returningTaskId) {
      setTimeout(() => {
        setReturningTaskId(null);
      }, 1000);
    }
  }, [selectedTask, returningTaskId]);

  // Check if a task is selected for deletion
  const isTaskSelectedForDelete = (task: Task) => {
    return selectedTasksForDelete.some((t) => t.ID === task.ID);
  };

  return (
    <fieldset>
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        tasks.map((task) => {
          const taskId = task.ID?.toString() || `task-${Math.random()}`;
          const detailText = task.status ? [`Status: ${task.status}`] : [];

          // Determine task classes
          const isSelected =
            selectedTask && taskId === selectedTask.ID?.toString();
          const isAnimating = animatingTaskId === taskId;
          const isReturning = returningTaskId === taskId;
          const isSelectedForDelete = isTaskSelectedForDelete(task);

          // Skip rendering if selected and not returning
          if (isSelected && !isReturning && !isDeleteMode) {
            return null;
          }

          return (
            <div
              onClick={() => {
                handleTaskClick(task);
              }}
              key={taskId}
              className={`
                ${styles.task} 
                ${
                  task.status === "completed"
                    ? styles["task-finish"]
                    : task.status === "in-progress"
                    ? styles["task-progress"]
                    : task.status === "pending"
                    ? styles["task-pending"]
                    : ""
                }
                ${isAnimating ? styles["task-selected"] : ""}
                ${isReturning ? styles["task-returning"] : ""}
                ${
                  isDeleteMode && isSelectedForDelete
                    ? styles["task-selected-for-delete"]
                    : ""
                }
              `}
            >
              {/* Title area */}
              <p>
                <span
                  className={styles.formFieldTitle}
                  suppressContentEditableWarning={true}
                >
                  {task.title}
                </span>
              </p>

              {/* Main content area */}
              <p>
                <span className={styles.formField}>{task.description}</span>
              </p>

              {/* Status details at the bottom */}
              {detailText.length > 0 && (
                <p className={styles.details}>
                  {detailText.map((detail, index) => (
                    <span key={index} className={styles.detailItem}>
                      {detail}
                    </span>
                  ))}
                </p>
              )}
              {/* Checkbox for delete mode */}
              {isDeleteMode && (
                <span className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={isSelectedForDelete}
                    onChange={() => {}} 
                    onClick={(e) => e.stopPropagation()}
                  />
                </span>
              )}
            </div>
          );
        })
      )}
      {!isDeleteMode && <Button text="Create new Task" onClick={handleClick} />}
    </fieldset>
  );
};

export default TasksList;

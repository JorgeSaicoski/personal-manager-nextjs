import { Task } from "@/services/tasks/tasks";
import styles from "./styles/TasksList.module.scss";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TasksListProps {
  tasks: Task[];
  selectedTask: Task | null;
  onTaskClick: (taskId: string) => void;
}

const TasksList = ({ tasks, selectedTask, onTaskClick }: TasksListProps) => {
  const router = useRouter();
  const [animatingTaskId, setAnimatingTaskId] = useState<string | null>(null);
  const [returningTaskId, setReturningTaskId] = useState<string | null>(null);

  const handleClick = () => {
    router.push("/tasks/create");
  };

  const handleTaskClick = (taskId: string | number) => {
    setAnimatingTaskId(taskId.toString());

    setTimeout(() => {
      if (selectedTask?.ID) {
        setReturningTaskId(selectedTask.ID.toString());
      }

      onTaskClick(taskId.toString());
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

          // Skip rendering if selected and not returning
          if (isSelected && !isReturning) {
            return null;
          }

          return (
            <div
              onClick={() => {
                handleTaskClick(taskId);
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
            </div>
          );
        })
      )}
      <Button text="Create new Task" onClick={handleClick}></Button>
    </fieldset>
  );
};

export default TasksList;

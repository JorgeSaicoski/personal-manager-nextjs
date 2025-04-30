"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllTasks, Task } from "@/services/tasks/tasks";
import styles from "./page.module.scss";
import SelectedTask from "@/components/SelectedTask";

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [animatingTaskId, setAnimatingTaskId] = useState<string | null>(null);
  const [returningTaskId, setReturningTaskId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    router.push("/tasks/create");
  };

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

  const handleTaskClick = (taskId: string | number) => {
    setAnimatingTaskId(taskId.toString());
    if (selectedTask?.ID){
      setReturningTaskId(selectedTask.ID.toString());
    }
    setTimeout(() => {
      const selected = tasks.find(
        (task) => task.ID?.toString() === taskId.toString()
      );
      if (selected) {
        setSelectedTask(selected);
        setAnimatingTaskId(null);
      }
    }, 750); 
  };
  
  const handleCloseTask = () => {
    if (selectedTask && selectedTask.ID) {
      setReturningTaskId(selectedTask.ID.toString());
      
      setSelectedTask(null);
      
      setTimeout(() => {
        setReturningTaskId(null);
      }, 500);
    }
  };

  return loading ? (
    <p>Loading</p>
  ) : (
    <>
      <div className={styles.wrapper}>
        <div className={styles.formPaper}>
          <fieldset>
            {tasks.length === 0 ? (
              <p>No tasks yet</p>
            ) : (
              tasks.map((task) => {
                const taskId = task.ID?.toString() || `task-${Math.random()}`;
                const detailText = task.status
                  ? [`Status: ${task.status}`]
                  : [];
                
                // Determine task classes
                const isSelected = selectedTask && taskId === selectedTask.ID?.toString();
                const isAnimating = animatingTaskId === taskId;
                const isReturning = returningTaskId === taskId;
                
                // Skip rendering if selected and not returning
                if (isSelected && !isReturning) {
                  return null;
                }

                return (
                  <div
                    onClick={() => {
                      if (!isReturning) handleTaskClick(taskId);
                    }}
                    key={taskId}
                    className={`
                      ${styles.task} 
                      ${task.status === "completed" ? styles["task-finish"] : 
                        task.status === "in-progress" ? styles["task-progress"] : 
                        task.status === "pending" ? styles["task-pending"] : ""}
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
                      <span className={styles.formField}>
                        {task.description}
                      </span>
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
        </div>
      </div>
      <SelectedTask task={selectedTask} onClose={handleCloseTask} />
    </>
  );
}
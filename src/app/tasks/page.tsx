"use client";

import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllTasks, Task } from "@/services/tasks/tasks";
import styles from "./page.module.scss";

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
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
    console.log("click");
    console.log(taskId);
    //router.push(`/tasks/${taskId}`);
  };

  return loading ? (
    <p>Loading</p>
  ) : (
    <div className={styles.wrapper}>
      <div className={styles.formPaper}>
        <fieldset>
          {tasks.length === 0 ? (
            <p>No tasks yet</p>
          ) : (
            tasks.map((task) => {
              const taskId = task.ID?.toString() || `task-${Math.random()}`;
              // Create a details array for the task status
              const detailText = task.status ? [`Status: ${task.status}`] : [];

              return (
                <div
                  key={taskId}
                  className={`${styles.task} ${
                    task.status === "completed"
                      ? styles["task-finish"]
                      : task.status === "in-progress"
                      ? styles["task-progress"]
                      : task.status === "pending"
                      ? styles["task-pending"]
                      : ""
                  }`}
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
      </div>
    </div>
  );
}

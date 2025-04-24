"use client";

import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllTasks, Task } from "@/services/tasks/tasks";
import Paper from "@/components/paper/paper";

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
      console.log(tasksData)
      setTasks(tasksData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTasks()
  },[]);
  
  const handleTaskClick = (taskId: string | number) => {
    console.log("click")
    console.log(taskId)
    //router.push(`/tasks/${taskId}`);
  };
  
  return (
    loading?
    <p>Loading</p>
    :
    <div>
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        tasks.map((task) => {
          const taskId = task.ID?.toString() || `task-${Math.random()}`;
          // Create a details array for the task status
          const detailText = task.status ? [`Status: ${task.status}`] : [];
          
          return (
            <div key={taskId} style={{ marginBottom: '20px' }}>
              <Paper
                title={task.title}
                text={task.description ?? ""}
                detailText={detailText}
                onClick={() => handleTaskClick(taskId)}
              />
            </div>
          );
        })
      )}
      <Button text="Create new Task" onClick={handleClick}></Button>
    </div>
  );
}

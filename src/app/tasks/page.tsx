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
  
  return (
    loading?
    <p>Loading</p>
    :
    <div>
      <ul>
        {tasks.length === 0 ? (
          <li>No tasks yet</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id?.toString() || `task-${Math.random()}`}>
              {task.title}
              {task.status && <span>({task.status})</span>}
              <Paper></Paper>
            </li>
          ))
        )}
      </ul>
      <Button text="Create new Task" onClick={handleClick}></Button>
    </div>
  );
}

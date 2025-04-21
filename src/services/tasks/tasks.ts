import { env } from "process";

// Configuration
const PORT_TASKS_MICROSERVICE = env.BACKEND_TASK_URL || "8080";
const BASE_URL = env.BACKEND_URL || "http://localhost";
const ENDPOINT = `${BASE_URL}:${PORT_TASKS_MICROSERVICE}`;

// Type definition for task
export interface Task {
  id?: string;
  title: string;
  description?: string;
  status?: 'pending' | 'in-progress' | 'completed';
  dueDate?: string;
}

/**
 * Fetch all tasks from the API
 */
export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(`${ENDPOINT}/tasks`);
    
    if (!response.ok) {
      throw new Error(`Error fetching tasks: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

/**
 * Create a new task
 */
export const createTask = async (task: Task): Promise<Task> => {
  try {
    const response = await fetch(`${ENDPOINT}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    if (!response.ok) {
      throw new Error(`Error creating task: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error;
  }
};

// Export an object with all functions for easier imports
export default {
  getAllTasks,
  createTask
};
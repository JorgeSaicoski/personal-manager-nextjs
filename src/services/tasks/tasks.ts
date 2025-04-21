// Configuration

const ENDPOINT = process.env.NEXT_PUBLIC_TASK_SERVICE_URL || "http://localhost:8000";

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
  console.log(ENDPOINT)
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
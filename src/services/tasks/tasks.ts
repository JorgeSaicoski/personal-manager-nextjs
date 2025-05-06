// Configuration
const ENDPOINT = process.env.NEXT_PUBLIC_TASK_SERVICE_URL || "http://localhost:8000";

// Type definition for task
export interface Task {
  ID?: string;
  title: string;
  description?: string;
  status?: 'pending' | 'in-progress' | 'completed';
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedTasksResponse {
  tasks: Task[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
}

/**
 * Fetch all tasks from the API
 */
export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(`${ENDPOINT}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
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
 * Fetch completed tasks from the API
 */
export const getCompletedTasks = async (page:number, pageSize:number): Promise<PaginatedTasksResponse> =>  {
  try {
    const response = await fetch(`${ENDPOINT}/tasks/completed?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching tasks: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }

}

/**
 * Fetch not completed tasks from the API
 */
export const getNonCompletedTasks = async (page:number, pageSize:number): Promise<PaginatedTasksResponse> =>  {
  try {
    const response = await fetch(`${ENDPOINT}/tasks/active?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching tasks: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }

}
/**
 * Get a single task by ID
 */
export const getTaskById = async (id: string): Promise<Task> => {
  try {
    const response = await fetch(`${ENDPOINT}/tasks/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching task: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch task with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new task
 */
export const createTask = async (task: Task): Promise<Task> => {
  try {
    const response = await fetch(`${ENDPOINT}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Error creating task: ${response.status}`
      );
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error;
  }
};

/**
 * Update an existing task
 */
export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  try {
    const response = await fetch(`${ENDPOINT}/tasks/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    if (!response.ok) {
      throw new Error(`Error updating task: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to update task with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a task
 */
export const deleteTask = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${ENDPOINT}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error deleting task: ${response.status}`);
    }
  } catch (error) {
    console.error(`Failed to delete task with ID ${id}:`, error);
    throw error;
  }
};

// Export an object with all functions for easier imports
export default {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
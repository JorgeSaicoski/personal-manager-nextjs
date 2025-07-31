// Configuration
const ENDPOINT =
  process.env.NEXT_PUBLIC_TASK_SERVICE_URL || "http://localhost:8000";

// Type definition for task
export interface Task {
  ID?: string;
  title: string;
  description?: string;
  status?: "pending" | "in-progress" | "completed";
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

const getHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add authorization if available
  if (typeof window !== "undefined") {
    try {
      const { getToken } = require("@/services/auth/keycloak");
      const token = getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting auth token:", error);
    }
  }

  return headers;
};

// Helper function to handle auth errors
const handleAuthError = (response: Response) => {
  if (response.status === 401 || response.status === 403) {
    console.error("Authentication error, redirecting to login...");
    if (typeof window !== "undefined") {
      try {
        const { login } = require("@/services/auth/keycloak");
        login();
      } catch (error) {
        console.error("Error redirecting to login:", error);
        window.location.href = "/";
      }
    }
  }
};

/**
 * Fetch all tasks from the API
 */
export const getAllTasks = async (
  page: number,
  pageSize: number
): Promise<PaginatedTasksResponse> => {
  try {
    const response = await fetch(
      `${ENDPOINT}/tasks?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      handleAuthError(response);
      throw new Error(`Error fetching tasks: ${response.status}`);
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

/**
 * Fetch completed tasks from the API
 */
export const getCompletedTasks = async (
  page: number,
  pageSize: number
): Promise<PaginatedTasksResponse> => {
  try {
    const response = await fetch(
      `${ENDPOINT}/tasks/completed?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      handleAuthError(response);
      throw new Error(`Error fetching tasks: ${response.status}`);
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

/**
 * Fetch not completed tasks from the API
 */
export const getNonCompletedTasks = async (
  page: number,
  pageSize: number
): Promise<PaginatedTasksResponse> => {
  try {
    const response = await fetch(
      `${ENDPOINT}/tasks/active?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      handleAuthError(response);
      throw new Error(`Error fetching tasks: ${response.status}`);
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

/**
 * Get a single task by ID
 */
export const getTaskById = async (id: string): Promise<Task> => {
  try {
    const response = await fetch(`${ENDPOINT}/tasks/${id}`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      handleAuthError(response);
      throw new Error(`Error fetching task: ${response.status}`);
    }

    const json = await response.json();
    return json.data;
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
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      handleAuthError(response);
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
export const updateTask = async (
  id: string,
  task: Partial<Task>
): Promise<Task> => {
  try {
    const response = await fetch(`${ENDPOINT}/tasks/update/${id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      handleAuthError(response);
      throw new Error(`Error updating task: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to update task with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete multiple tasks by IDs
 */
export const deleteSelectedTasks = async (taskIds: string[]): Promise<void> => {
  try {
    const response = await fetch(`${ENDPOINT}/tasks/delete-selected`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(taskIds),
    });

    if (!response.ok) {
      handleAuthError(response);
      throw new Error(`Error deleting tasks: ${response.status}`);
    }
  } catch (error) {
    console.error(`Failed to delete selected tasks:`, error);
    throw error;
  }
};

/**
 * Delete all completed tasks
 */
export const deleteAllCompletedTasks = async (): Promise<void> => {
  try {
    const response = await fetch(`${ENDPOINT}/tasks/delete-completed`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!response.ok) {
      handleAuthError(response);
      throw new Error(`Error deleting completed tasks: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to delete completed tasks:", error);
    throw error;
  }
};

/**
 * Delete all non-completed tasks
 */
export const deleteAllNonCompletedTasks = async (): Promise<void> => {
  try {
    const response = await fetch(`${ENDPOINT}/tasks/delete-non-completed`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!response.ok) {
      handleAuthError(response);
      throw new Error(`Error deleting non-completed tasks: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to delete non-completed tasks:", error);
    throw error;
  }
};

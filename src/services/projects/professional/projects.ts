import { getToken, isAuthenticated } from "@/services/auth/keycloak";

const ENDPOINT =
  process.env.NEXT_PUBLIC_PROJECT_PROFESSIONAL_SERVICE_URL ||
  "http://localhost:8002";

export interface BaseProject {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  companyId?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfessionalProject {
  id: number;
  baseProjectId: string;
  clientName?: string;
  totalSalaryCost: number;
  totalHours: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  baseProject?: BaseProject;
}

export interface FreelanceProject {
  id: number;
  professionalProjectId: number;
  workerUserId: string;
  costPerHour: number;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfessionalProjectRequest {
  title: string;
  clientName?: string;
}

export interface UpdateProfessionalProjectRequest {
  clientName?: string;
  isActive?: boolean;
}

export interface PaginatedProjectsResponse {
  projects: ProfessionalProject[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

/**
 * Get authentication headers for API requests
 */
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
/**
 * Get all professional projects for the current user
 */
export const getProfessionalProjects = async (
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedProjectsResponse> => {
  try {
    const response = await fetch(
      `${ENDPOINT}/projects?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching projects: ${response.status}`);
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Failed to fetch professional projects:", error);
    throw error;
  }
};

/**
 * Get a single professional project by ID
 */
export const getProfessionalProjectById = async (
  id: string
): Promise<ProfessionalProject> => {
  try {
    const response = await fetch(`${ENDPOINT}/projects/${id}`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error fetching project: ${response.status}`);
    }
    const json = await response.json();
    console.log("return in service");
    console.log(json.data);
    return json.data;
  } catch (error) {
    console.error(`Failed to fetch project with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new professional project
 */
export const createProfessionalProject = async (
  project: CreateProfessionalProjectRequest
): Promise<ProfessionalProject> => {
  try {
    const response = await fetch(`${ENDPOINT}/projects`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Error creating project: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to create professional project:", error);
    throw error;
  }
};

/**
 * Update an existing professional project
 */
export const updateProfessionalProject = async (
  id: string,
  project: UpdateProfessionalProjectRequest
): Promise<ProfessionalProject> => {
  try {
    const response = await fetch(`${ENDPOINT}/projects/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error(`Error updating project: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to update project with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a professional project
 */
export const deleteProfessionalProject = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${ENDPOINT}/projects/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error deleting project: ${response.status}`);
    }
  } catch (error) {
    console.error(`Failed to delete project with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete multiple professional projects
 */
export const deleteSelectedProjects = async (
  projectIds: string[]
): Promise<void> => {
  try {
    const response = await fetch(`${ENDPOINT}/projects/delete-selected`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(projectIds),
    });

    if (!response.ok) {
      throw new Error(`Error deleting projects: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to delete selected projects:", error);
    throw error;
  }
};

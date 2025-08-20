import { getToken, updateToken } from "@/services/auth/keycloak";

const BASE_URL =
  process.env.NEXT_PUBLIC_PROJECT_PROFESSIONAL_SERVICE_URL ||
  "http://localhost:8002/projects";

const ENDPOINT= `${BASE_URL}/projects`;

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
  title: string;
  baseProjectId: string;
  clientName?: string;
  totalSalaryCost: number;
  totalHours: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  baseProject?: BaseProject;
}

export interface ProjectAssignment {
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

export interface CreateProjectAssignmentRequest {
  projectId: number;           
  costPerHour: number;
  description?: string;
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
const getHeaders = async (): Promise<Record<string, string>> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (typeof window !== "undefined") {
    try {
      await updateToken(5);
      const token = getToken();
      if (token) headers["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.error("Error getting auth token:", error);
    }
  }

  return headers;
};

// Abort/timeout helper to avoid hanging requests (optional but useful)
const withTimeout = (ms: number) => {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  return { signal: ctrl.signal, clear: () => clearTimeout(id) };
};

/**
 * Get all professional projects for the current user
 */
export const getProfessionalProjects = async (
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedProjectsResponse> => {
  console.log(`${ENDPOINT}?page=${page}&pageSize=${pageSize}`)
  try {
    const t = withTimeout(15000);
    const url = `${ENDPOINT}?page=${page}&pageSize=${pageSize}`;
    const response = await fetch(url, {
      method: "GET",
      headers: await getHeaders(),
      signal: t.signal,
    });
    t.clear();

    if (!response.ok) {
      if (response.status === 401) throw new Error("Unauthorized");
      throw new Error(`Error fetching projects: ${response.status}`);
    }

    const json = await response.json();
    // Normalize: backend uses { data: { projects, totalPages, ... } } or { data: ... }
    return json.data ?? json;
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
    const t = withTimeout(15000);
    const response = await fetch(`${ENDPOINT}/id/${id}`, {
      method: "GET",
      headers: await getHeaders(),
      signal: t.signal,
    });
    t.clear();

    if (!response.ok) {
      if (response.status === 401) throw new Error("Unauthorized");
      throw new Error(`Error fetching project: ${response.status}`);
    }
    const json = await response.json();
    return json.data ?? json;
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
    const t = withTimeout(15000);
    const response = await fetch(`${ENDPOINT}`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(project),
      signal: t.signal,
    });
    t.clear();

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Error creating project: ${response.status}`
      );
    }

    const json = await response.json();
    return json.data ?? json;
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
    const t = withTimeout(15000);
    const response = await fetch(`${ENDPOINT}/id/${id}`, {
      method: "PUT",
      headers: await getHeaders(),
      body: JSON.stringify(project),
      signal: t.signal,
    });
    t.clear();

    if (!response.ok) {
      if (response.status === 401) throw new Error("Unauthorized");
      throw new Error(`Error updating project: ${response.status}`);
    }

    const json = await response.json();
    return json.data ?? json;
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
    const t = withTimeout(15000);
    const response = await fetch(`${ENDPOINT}/id/${id}`, {
      method: "DELETE",
      headers: await getHeaders(),
      signal: t.signal,
    });
    t.clear();

    if (!response.ok) {
      if (response.status === 401) throw new Error("Unauthorized");
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
export const deleteSelectedProjects = async (projectIds: string[]): Promise<void> => {
  const t = withTimeout(15000);
  try {
    const response = await fetch(`${ENDPOINT}/delete-selected`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(projectIds),
      signal: t.signal,
    });
    if (!response.ok) {
      if (response.status === 401) throw new Error("Unauthorized");
      throw new Error(`Error deleting projects: ${response.status}`);
    }
  } finally {
    t.clear();
  }
};

/**
 * Get current user's project assignments (assignments-only)
 * Backend route: GET /projects/mine
 * Server returns: [{ id, parentProjectId, workerUserId, role, hoursDedicated, costPerHour, isActive, ...timestamps }]
 * We map parentProjectId -> professionalProjectId to match the existing interface.
 */
export const getMyAssignments = async (): Promise<ProjectAssignment[]> => {
  try {
    const t = withTimeout(15000);
    const response = await fetch(`${ENDPOINT}/mine`, {
      method: "GET",
      headers: await getHeaders(),
      signal: t.signal,
    });
    console.log(response)
    t.clear();

    if (!response.ok) {
      if (response.status === 401) throw new Error("Unauthorized");
      throw new Error(`Error fetching assignments: ${response.status}`);
    }

    const data = await response.json(); // expects an array
    const list = (Array.isArray(data) ? data : data.data) as any[];
    if (!Array.isArray(list)) return [];

    // Map server field -> client interface
    return list.map((a) => ({
      id: a.id,
      professionalProjectId: a.parentProjectId, // mapping here
      workerUserId: a.workerUserId,
      costPerHour: a.costPerHour,
      description: a.description,
      isActive: a.isActive,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    })) as ProjectAssignment[];
  } catch (error) {
    console.error("Failed to fetch my assignments:", error);
    throw error;
  }
};


export const createProjectAssignment = async (
  req: CreateProjectAssignmentRequest
): Promise<ProjectAssignment> => {
  const { projectId, costPerHour, description } = req;

  const t = withTimeout(15000);
  try {
    const res = await fetch(`${ENDPOINT}/id/${projectId}/freelance`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify({ costPerHour, description }),
      signal: t.signal,
    });

    if (!res.ok) {
      if (res.status === 401) throw new Error("Unauthorized");
      // backend may or may not return JSON on error; guard it
      let msg = `Error creating assignment: ${res.status}`;
      try {
        const j = await res.json();
        if (j?.error) msg = j.error;
      } catch {}
      throw new Error(msg);
    }

    const json = await res.json();
    // Accept either {data: {...}} or direct object
    return (json?.data ?? json) as ProjectAssignment;
  } finally {
    t.clear();
  }
};
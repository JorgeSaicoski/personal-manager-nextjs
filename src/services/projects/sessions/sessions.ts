import { getToken, isAuthenticated } from "@/services/auth/keycloak";

const ENDPOINT =
  process.env.NEXT_PUBLIC_PROJECT_PROFESSIONAL_SERVICE_URL ||
  "http://localhost:8002";

/** ========= Types (align with backend responses) ========= **/

export type BreakType = "break" | "lunch" | "brb";

export interface TimeSession {
  id: number;
  userId: string;
  projectId?: number;
  companyId?: number;
  hourlyRate?: number;
  startedAt: string;        // ISO
  finishedAt?: string;      // ISO | null
  totalSeconds?: number;    // server-calculated duration
  earnedAmount?: number;    // server-calculated revenue
  isActive: boolean;
  // include break state if backend returns it
  currentBreak?: {
    id: number;
    type: BreakType;
    startedAt: string;      // ISO
    endedAt?: string;       // ISO | null
  } | null;
}

export interface ActiveSessionResponse {
  active: boolean;
  session?: TimeSession | null;
}

export interface SessionBreak {
  id: number;
  userId: string;
  type: BreakType;
  startedAt: string;
  endedAt?: string;
}

export interface UserTimeReport {
  userId: string;
  projectId?: number;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  totalWorkedSeconds: number;
  totalBreakSeconds: number;
  sessions: Array<{
    id: number;
    projectId?: number;
    companyId?: number;
    startedAt: string;
    finishedAt: string;
    workedSeconds: number;
    earnedAmount?: number;
  }>;
}

/** ========= Helpers ========= **/

const getHeaders = async (): Promise<HeadersInit> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (isAuthenticated() && getToken) {
    try {
      const token = await getToken();
      if (token) headers["Authorization"] = `Bearer ${token}`;
    } catch (err) {
      console.error("sessions.ts:getHeaders -> token error:", err);
    }
  }
  return headers;
};

const handle = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} ${text ? `- ${text}` : ""}`.trim());
  }
  // Your backend uses a common envelope (message, data?) — unwrap if needed:
  const json = await res.json().catch(() => ({}));
  // Try common shapes:
  if (json?.data !== undefined) return json.data as T;
  if (json?.session !== undefined) return json as T;
  return json as T;
};

/** ========= API Calls ========= **/

export const startWorkSession = async (params: {
  projectId?: number;     
  companyId?: number;     // optional
  hourlyRate?: number;    // optional
}): Promise<TimeSession> => {
  const res = await fetch(`${ENDPOINT}/sessions/start`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify({
      projectId: params.projectId,
      companyId: params.companyId,
      hourlyRate: params.hourlyRate,
    }),
  });
  return handle<TimeSession>(res);
};

export const finishWorkSession = async (): Promise<TimeSession> => {
  const res = await fetch(`${ENDPOINT}/sessions/finish`, {
    method: "POST",
    headers: await getHeaders(),
  });
  return handle<TimeSession>(res);
};

export const getActiveSession = async (): Promise<ActiveSessionResponse> => {
  const res = await fetch(`${ENDPOINT}/sessions/active`, {
    method: "GET",
    headers: await getHeaders(),
  });
  return handle<ActiveSessionResponse>(res);
};

export const takeBreak = async (breakType: BreakType): Promise<SessionBreak> => {
  const res = await fetch(`${ENDPOINT}/sessions/break`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify({ breakType }),
  });
  return handle<SessionBreak>(res);
};

export const endBreak = async (): Promise<SessionBreak> => {
  const res = await fetch(`${ENDPOINT}/sessions/resume`, {
    method: "POST",
    headers: await getHeaders(),
  });
  return handle<SessionBreak>(res);
};

export const switchProject = async (newProjectId: number): Promise<TimeSession> => {
  const res = await fetch(`${ENDPOINT}/sessions/switch-project`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify({ newProjectID: newProjectId }),
  });
  return handle<TimeSession>(res);
};

export const switchCompany = async (params: {
  newCompanyId: number;
  newProjectId?: number;
  hourlyRate?: number;
}): Promise<TimeSession> => {
  const res = await fetch(`${ENDPOINT}/sessions/switch-company`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify({
      newCompanyID: params.newCompanyId,
      newProjectID: params.newProjectId,
      hourlyRate: params.hourlyRate,
    }),
  });
  return handle<TimeSession>(res);
};

export const getUserSessionHistory = async (filters?: {
  startDate?: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
}): Promise<{ sessions: TimeSession[]; total: number }> => {
  const qs = new URLSearchParams();
  if (filters?.startDate) qs.set("startDate", filters.startDate);
  if (filters?.endDate) qs.set("endDate", filters.endDate);
  const res = await fetch(`${ENDPOINT}/sessions/history${qs.toString() ? `?${qs.toString()}` : ""}`, {
    method: "GET",
    headers: await getHeaders(),
  });
  return handle<{ sessions: TimeSession[]; total: number }>(res);
};

export const getProjectSessions = async (projectId: number): Promise<{ sessions: TimeSession[]; total: number }> => {
  const res = await fetch(`${ENDPOINT}/sessions/project/${projectId}`, {
    method: "GET",
    headers: await getHeaders(),
  });
  return handle<{ sessions: TimeSession[]; total: number }>(res);
};

export const generateUserTimeReport = async (params: {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  projectId?: number;
}): Promise<UserTimeReport> => {
  const qs = new URLSearchParams();
  if (params.projectId !== undefined) qs.set("projectId", String(params.projectId));
  qs.set("startDate", params.startDate);
  qs.set("endDate", params.endDate);

  const res = await fetch(`${ENDPOINT}/sessions/report?${qs.toString()}`, {
    method: "GET",
    headers: await getHeaders(),
  });
  return handle<UserTimeReport>(res);
};

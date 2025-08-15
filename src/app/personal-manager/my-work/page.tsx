"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.scss";

import {
  getMyAssignments,
  type ProjectAssignment,
} from "@/services/projects/professional/projects";

import {
  getActiveSession,
  startWorkSession,
  finishWorkSession,
  takeBreak,
  endBreak,
  type ActiveSessionResponse,
  type TimeSession,
} from "@/services/projects/sessions/sessions";

export default function MyWorkPage() {
  const [assignments, setAssignments] = useState<ProjectAssignment[]>([]);
  const [active, setActive] = useState<ActiveSessionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Re-render ticker while a session is active so elapsed time updates on screen.
  const [tick, setTick] = useState<number>(0);
  const tickRef = useRef<number | null>(null);

  const isOnBreak = useMemo(() => {
    if (!active?.active || !active.session) return false;
    const b = active.session.currentBreak;
    return !!b && !b.endedAt;
  }, [active]);

  const formatElapsed = useCallback((s?: TimeSession | null): string => {
    if (!s) return "-";
    try {
      const start = new Date(s.startedAt).getTime();
      const now = Date.now();
      let elapsedMs =
        (s.finishedAt ? new Date(s.finishedAt).getTime() : now) - start;

      if (s.isActive && s.currentBreak && !s.currentBreak.endedAt) {
        const bStart = new Date(s.currentBreak.startedAt).getTime();
        elapsedMs -= Math.max(0, now - bStart);
      }
      if (elapsedMs < 0) elapsedMs = 0;

      const totalMins = Math.floor(elapsedMs / 60000);
      const hrs = Math.floor(totalMins / 60);
      const mins = String(totalMins % 60).padStart(2, "0");
      return `${hrs}h${mins}m`;
    } catch {
      return "-";
    }
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const [a, s] = await Promise.all([getMyAssignments(), getActiveSession()]);
      setAssignments(Array.isArray(a) ? a : []);
      setActive(s ?? null);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    refresh();
  }, [refresh]);

  // Start/Stop a 30s ticker while a session is active (UI refresh of elapsed time)
  useEffect(() => {
    if (active?.active && active.session) {
      tickRef.current = window.setInterval(() => setTick((t) => t + 1), 30000);
      return () => {
        if (tickRef.current) {
          clearInterval(tickRef.current);
          tickRef.current = null;
        }
      };
    }
    // Clear if no active session
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, [active, tick]);

  // Handlers
  const handleStart = async (a: ProjectAssignment) => {
    setErrorMsg(null);
    try {
      await startWorkSession({
        projectId: a.professionalProjectId,
        hourlyRate: a.costPerHour,
      });
      await refresh();
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to start session.");
    }
  };

  const handleStop = async () => {
    if (!active?.active) return;
    setErrorMsg(null);
    try {
      await finishWorkSession();
      await refresh();
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to stop session.");
    }
  };

  const handleBreak = async () => {
    if (!active?.active || !active.session) return;
    setErrorMsg(null);
    try {
      if (isOnBreak) {
        await endBreak();
      } else {
        await takeBreak("break");
      }
      await refresh();
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to toggle break.");
    }
  };

  // Derived UI flags
  const hasActive = !!(active?.active && active.session);
  const canStart = !hasActive;
  const canToggleBreak = hasActive;
  const canStop = hasActive;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Work</h1>
        <p className={styles.subtitle}>Assignments and current session</p>
      </header>

      {errorMsg && <div className={styles.error}>{errorMsg}</div>}

      {/* Active session card */}
      <section className={styles.activeSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Active Session</h2>
        </div>

        {loading ? (
          <p className={styles.loading}>Loading…</p>
        ) : hasActive ? (
          <div className={styles.activeCard}>
            <div className={styles.activeMeta}>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Session</span>
                <span className={styles.metaValue}>#{active!.session!.id}</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Started</span>
                <span className={styles.metaValue}>
                  {new Date(active!.session!.startedAt).toLocaleString()}
                </span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Elapsed</span>
                <span className={styles.metaValue}>
                  {formatElapsed(active!.session!)}
                </span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Status</span>
                <span className={styles.metaValue}>
                  {isOnBreak ? "On break" : "Working"}
                </span>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.btnSecondary}
                onClick={handleBreak}
                disabled={!canToggleBreak}
              >
                {isOnBreak ? "Resume ▶" : "Break ☕"}
              </button>
              <button
                className={styles.btnDanger}
                onClick={handleStop}
                disabled={!canStop}
              >
                Stop ■
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.empty}>
            <p>No active session.</p>
          </div>
        )}
      </section>

      {/* Assignments grid */}
      <section className={styles.assignmentsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Your Assignments</h2>
        </div>

        {loading ? (
          <p className={styles.loading}>Loading…</p>
        ) : assignments.length === 0 ? (
          <div className={styles.empty}>
            <p>No assignments found.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {assignments.map((a) => (
              <div key={a.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>
                    Project #{a.professionalProjectId}
                  </h3>
                  <span
                    className={
                      a.isActive ? styles.badgeActive : styles.badgeInactive
                    }
                  >
                    {a.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardRow}>
                    <span className={styles.cardLabel}>Rate</span>
                    <span className={styles.cardValue}>
                      {a.costPerHour ? `$${a.costPerHour}/h` : "—"}
                    </span>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <button
                    className={styles.btnPrimary}
                    onClick={() => handleStart(a)}
                    disabled={!a.isActive || !canStart}
                    title={
                      !a.isActive
                        ? "Assignment inactive"
                        : !canStart
                        ? "There is an active session"
                        : "Start working"
                    }
                  >
                    Start ▶
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

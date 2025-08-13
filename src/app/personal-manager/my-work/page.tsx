"use client";

import { useEffect, useState } from "react";
//import { listMyAssignments, listMyActiveSession, startSession, stopSession, breakSession } from "@/services/work";
import styles from "./page.module.scss";

export default function MyWorkPage() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [activeSession, setActiveSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Load assignments + session
  const refresh = async () => {
    setLoading(true);
    //const [a, s] = await Promise.all([listMyAssignments(), listMyActiveSession()]);
    //setAssignments(a);
    //setActiveSession(s);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  // --- Handlers
  const handleStart = async (assignmentId: string) => {
    // await startSession({ assignmentId });
    refresh();
  };

  const handleStop = async () => {
    if (!activeSession) return;
    // await stopSession({ sessionId: activeSession.id });
    refresh();
  };

  const handleBreak = async () => {
    if (!activeSession) return;
    // await breakSession({ sessionId: activeSession.id });
    refresh();
  };

  if (loading) return <p className={styles.loading}>Loading…</p>;

  return (
    <div className={styles.container}>
      <h1>⏱ My Work</h1>

      {/* Active session */}
      {activeSession ? (
        <div className={styles.activeSession}>
          <h2>Working on: {activeSession.projectTitle}</h2>
          <p>Elapsed: {activeSession.elapsedFormatted}</p>
          {activeSession.onBreak ? (
            <button onClick={handleBreak}>▶ Resume</button>
          ) : (
            <button onClick={handleBreak}>☕ Break</button>
          )}
          <button onClick={handleStop}>■ Stop</button>
        </div>
      ) : (
        <p>No active session.</p>
      )}

      {/* List assignments */}
      <h2>Your Assignments</h2>
      <div className={styles.grid}>
        {assignments.map((a) => (
          <div key={a.id} className={styles.card}>
            <h3>{a.projectTitle}</h3>
            <p>Client: {a.clientName}</p>
            <p>Rate: ${a.costPerHour}/h</p>
            <button onClick={() => handleStart(a.id)} disabled={!!activeSession}>▶ Start</button>
          </div>
        ))}
      </div>
    </div>
  );
}

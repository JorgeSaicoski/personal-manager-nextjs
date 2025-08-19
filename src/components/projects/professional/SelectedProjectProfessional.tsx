import { useState, useEffect } from "react";
import {
  ProfessionalProject,
  UpdateProfessionalProjectRequest,
  createProjectAssignment,
} from "@/services/projects/professional/projects";
import styles from "./styles/SelectedProjectProfessional.module.scss";

interface SelectedProjectProfessionalProps {
  project: ProfessionalProject;
  onUpdate: (id: string, data: UpdateProfessionalProjectRequest) => void;
  onClose: () => void;
}

const SelectedProjectProfessional = ({
  project,
  onUpdate,
  onClose,
}: SelectedProjectProfessionalProps) => {
  const [clientName, setClientName] = useState(project.clientName || "");
  const [isActive, setIsActive] = useState(project.isActive);
  const [saved, setSaved] = useState(true);
  const [isAssigning, setIsAssigning] = useState(false);

  useEffect(() => {
    setClientName(project.clientName || "");
    setIsActive(project.isActive);
    setSaved(true);
  }, [project]);

  const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientName(e.target.value);
    setSaved(false);
  };

  const handleActiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsActive(e.target.value === "true");
    setSaved(false);
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const updateData: UpdateProfessionalProjectRequest = {
        clientName: clientName.trim() || undefined,
        isActive,
      };

      onUpdate(project.id.toString(), updateData);
      setSaved(true);
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const handleClose = () => {
    setSaved(true);
    onClose();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };
  const handleAssignMyself = async () => {
    const hourlyRateStr = prompt("Enter your hourly rate (e.g. 50)");
    if (!hourlyRateStr) return;
    const costPerHour = Number(hourlyRateStr);
    if (isNaN(costPerHour)) return alert("Invalid number");
    setIsAssigning(true);
    try {
      await createProjectAssignment({ projectId: project.id, costPerHour });
      alert("You have been assigned to this project.");
    } catch (err) {
      console.error(err);
      alert("Failed to assign. Check console.");
    } finally {
      setIsAssigning(false);
    }
  };

  const formatHours = (hours: number) => {
    return `${hours.toFixed(1)} hours`;
  };

  return (
    <div className={`${styles.slideOut} ${styles.visible}`}>
      <div className={styles.top}>
        <h2>{project.baseProject?.title || `Project ${project.id}`}</h2>
        <button
          className={`${styles.saveButton} ${saved ? styles.saved : ""}`}
          onClick={(e) => handleSave(e)}
          disabled={saved}
        >
          {saved ? "Saved" : "Save"}
        </button>
        <button className={styles.closeButton} onClick={handleClose}>
          ×
        </button>
      </div>

      <div className={styles.modal}>
        {/* Project description (read-only from base project) */}
        <div className={styles.field}>
          <label>Description:</label>
          <p className={styles.readOnlyField}>
            {project.baseProject?.description || "No description"}
          </p>
        </div>

        {/* Client name */}
        <div className={styles.field}>
          <label htmlFor="clientName">Client Name:</label>
          <input
            id="clientName"
            type="text"
            value={clientName}
            onChange={handleClientNameChange}
            placeholder="Enter client name (optional)"
          />
        </div>

        {/* Project status */}
        <div className={styles.field}>
          <label htmlFor="isActive">Status:</label>
          <select
            id="isActive"
            value={isActive.toString()}
            onChange={handleActiveChange}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <button
            onClick={handleAssignMyself}
            disabled={isAssigning}
            className={styles.assignBtn}
          >
            👤 Assign Myself
          </button>
        </div>

        {/* Project statistics (read-only) */}
        <div className={styles.statsSection}>
          <h3>Project Statistics</h3>
          <div className={styles.statsGrid}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Total Hours:</span>
              <span className={styles.statValue}>
                {formatHours(project.totalHours)}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Total Cost:</span>
              <span className={styles.statValue}>
                {formatCurrency(project.totalSalaryCost)}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Created:</span>
              <span className={styles.statValue}>
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Last Updated:</span>
              <span className={styles.statValue}>
                {new Date(project.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedProjectProfessional;

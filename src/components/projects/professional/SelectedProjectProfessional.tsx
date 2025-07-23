import { useState, useEffect } from "react";
import { ProfessionalProject, UpdateProfessionalProjectRequest } from "@/services/projects/professional/projects";
import styles from "./styles/SelectedProjectProfessional.module.scss";

interface SelectedProjectProfessionalProps {
  project: ProfessionalProject;
  onUpdate: (id: string, data: UpdateProfessionalProjectRequest) => void;
  onClose: () => void;
}

const SelectedProjectProfessional = ({ project, onUpdate, onClose }: SelectedProjectProfessionalProps) => {
  const [clientName, setClientName] = useState(project.clientName || "");
  const [salaryPerHour, setSalaryPerHour] = useState(project.salaryPerHour?.toString() || "");
  const [isActive, setIsActive] = useState(project.isActive);
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    setClientName(project.clientName || "");
    setSalaryPerHour(project.salaryPerHour?.toString() || "");
    setIsActive(project.isActive);
    setSaved(true);
  }, [project]);

  const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientName(e.target.value);
    setSaved(false);
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string or valid numbers
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setSalaryPerHour(value);
      setSaved(false);
    }
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
        salaryPerHour: salaryPerHour ? parseFloat(salaryPerHour) : undefined,
        isActive,
      };

      await onUpdate(project.id.toString(), updateData);
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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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

        {/* Salary per hour */}
        <div className={styles.field}>
          <label htmlFor="salaryPerHour">Hourly Rate ($):</label>
          <input
            id="salaryPerHour"
            type="text"
            value={salaryPerHour}
            onChange={handleSalaryChange}
            placeholder="0.00"
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

        {/* Freelance projects section (if any) 
        {project.freelanceProjects && project.freelanceProjects.length > 0 && (
          <div className={styles.freelanceSection}>
            <h3>Freelance Sub-projects</h3>
            <div className={styles.freelanceList}>
              {project.freelanceProjects.map((freelance, index) => (
                <div key={freelance.id} className={styles.freelanceItem}>
                  <span className={styles.freelanceRate}>
                    {formatCurrency(freelance.costPerHour)}/hr
                  </span>
                  <span className={styles.freelanceStatus}>
                    {freelance.isActive ? "Active" : "Inactive"}
                  </span>
                  {freelance.description && (
                    <p className={styles.freelanceDesc}>{freelance.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}*/}
      </div>
    </div>
  );
};

export default SelectedProjectProfessional;
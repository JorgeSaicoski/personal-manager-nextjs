import Button from "@/components/Button";
import styles from "./styles/DeleteConfirmation.module.scss";
import { ProfessionalProject } from "@/services/projects/professional/projects";

interface DeleteConfirmationProps {
  selectedProjects: ProfessionalProject[];
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation = ({
  selectedProjects,
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) => {
  if (selectedProjects.length === 0) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const totalHours = selectedProjects.reduce((sum, project) => sum + project.totalHours, 0);
  const totalCost = selectedProjects.reduce((sum, project) => sum + project.totalSalaryCost, 0);

  return (
    <div className={styles.overlay}>
      <div className={styles.confirmationBox}>
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete {selectedProjects.length} project
          {selectedProjects.length > 1 ? "s" : ""}?
        </p>
        
        {/* Warning about data loss */}
        {(totalHours > 0 || totalCost > 0) && (
          <div className={styles.warningSection}>
            <div className={styles.warning}>
              ⚠️ This will permanently delete:
            </div>
            <div className={styles.dataLoss}>
              <span>{totalHours.toFixed(1)} hours of tracked time</span>
              <span>{formatCurrency(totalCost)} in project costs</span>
            </div>
          </div>
        )}

        <div className={styles.projectList}>
          {selectedProjects.map((project) => (
            <div key={project.id} className={styles.projectItem}>
              <div className={styles.projectTitle}>
                {project.baseProject?.title || `Project ${project.id}`}
              </div>
              {project.clientName && (
                <div className={styles.projectClient}>
                  Client: {project.clientName}
                </div>
              )}
              <div className={styles.projectStats}>
                <span>{project.totalHours.toFixed(1)}h</span>
                <span>{formatCurrency(project.totalSalaryCost)}</span>
                <span className={`${styles.status} ${project.isActive ? styles.active : styles.inactive}`}>
                  {project.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.buttonGroup}>
          <Button text="Cancel" onClick={onCancel} />
          <Button 
            text={`Delete ${selectedProjects.length} Project${selectedProjects.length > 1 ? "s" : ""}`} 
            onClick={onConfirm} 
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
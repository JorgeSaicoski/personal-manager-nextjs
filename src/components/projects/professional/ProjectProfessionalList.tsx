
import { ProfessionalProject } from "@/services/projects/professional/projects";
import styles from "./styles/ProjectsProfessionalList.module.scss";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProjectsProfessionalListProps {
  projects: ProfessionalProject[];
  selectedProject: ProfessionalProject | null;
  onProjectClick: (projectId: string) => void;
  isDeleteMode: boolean;
  selectedProjectsForDelete: ProfessionalProject[];
  onProjectSelectForDelete: (project: ProfessionalProject) => void;
}

const ProjectsProfessionalList = ({
  projects,
  selectedProject,
  onProjectClick,
  isDeleteMode,
  selectedProjectsForDelete,
  onProjectSelectForDelete,
}: ProjectsProfessionalListProps) => {
  const router = useRouter();
  const [animatingProjectId, setAnimatingProjectId] = useState<string | null>(null);
  const [returningProjectId, setReturningProjectId] = useState<string | null>(null);

  const handleClick = () => {
    router.push("/personal-manager/projects/create");
  };

  const handleProjectClick = (project: ProfessionalProject) => {
    if (isDeleteMode) {
      onProjectSelectForDelete(project);
      return;
    }

    const projectId = project.id?.toString() || "";
    setAnimatingProjectId(projectId);

    setTimeout(() => {
      if (selectedProject?.id) {
        setReturningProjectId(selectedProject.id.toString());
      }

      onProjectClick(projectId);
      setAnimatingProjectId(null);
    }, 500);
  };

  // Reset returning project ID when selected project changes
  useEffect(() => {
    if (selectedProject === null && returningProjectId) {
      setTimeout(() => {
        setReturningProjectId(null);
      }, 1000);
    }
  }, [selectedProject, returningProjectId]);

  // Check if a project is selected for deletion
  const isProjectSelectedForDelete = (project: ProfessionalProject) => {
    return selectedProjectsForDelete.some((p) => p.id === project.id);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Format hours
  const formatHours = (hours: number) => {
    return `${hours.toFixed(1)}h`;
  };

  return (
    <fieldset>
      {projects.length === 0 ? (
        <p>No professional projects yet</p>
      ) : (
        projects.map((project) => {
          const projectId = project.id?.toString() || `project-${Math.random()}`;
          const detailText = [];
          
          if (project.clientName) {
            detailText.push(`Client: ${project.clientName}`);
          }
          
          if (project.salaryPerHour) {
            detailText.push(`Rate: ${formatCurrency(project.salaryPerHour)}/hr`);
          }
          
          if (project.totalHours > 0) {
            detailText.push(`Hours: ${formatHours(project.totalHours)}`);
          }
          
          if (project.totalSalaryCost > 0) {
            detailText.push(`Total: ${formatCurrency(project.totalSalaryCost)}`);
          }

          // Determine project classes
          const isSelected =
            selectedProject && projectId === selectedProject.id?.toString();
          const isAnimating = animatingProjectId === projectId;
          const isReturning = returningProjectId === projectId;
          const isSelectedForDelete = isProjectSelectedForDelete(project);

          // Skip rendering if selected and not returning
          if (isSelected && !isReturning && !isDeleteMode) {
            return null;
          }

          return (
            <div
              onClick={() => {
                handleProjectClick(project);
              }}
              key={projectId}
              className={`
                ${styles.project} 
                ${
                  project.isActive
                    ? styles["project-active"]
                    : styles["project-inactive"]
                }
                ${isAnimating ? styles["project-selected"] : ""}
                ${isReturning ? styles["project-returning"] : ""}
                ${
                  isDeleteMode && isSelectedForDelete
                    ? styles["project-selected-for-delete"]
                    : ""
                }
              `}
            >
              {/* Title area */}
              <p>
                <span
                  className={styles.formFieldTitle}
                  suppressContentEditableWarning={true}
                >
                  {project.baseProject?.title || `Project ${project.id}`}
                </span>
              </p>

              {/* Main content area */}
              <p>
                <span className={styles.formField}>
                  {project.baseProject?.description || "No description"}
                </span>
              </p>

              {/* Project details at the bottom */}
              {detailText.length > 0 && (
                <p className={styles.details}>
                  {detailText.map((detail, index) => (
                    <span key={index} className={styles.detailItem}>
                      {detail}
                    </span>
                  ))}
                </p>
              )}

              {/* Status indicator */}
              <div className={styles.statusIndicator}>
                <span className={`${styles.status} ${project.isActive ? styles.active : styles.inactive}`}>
                  {project.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Checkbox for delete mode */}
              {isDeleteMode && (
                <span className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={isSelectedForDelete}
                    onChange={() => {}} 
                    onClick={(e) => e.stopPropagation()}
                  />
                </span>
              )}
            </div>
          );
        })
      )}
      {!isDeleteMode && <Button text="Create new Project" onClick={handleClick} />}
    </fieldset>
  );
};

export default ProjectsProfessionalList;
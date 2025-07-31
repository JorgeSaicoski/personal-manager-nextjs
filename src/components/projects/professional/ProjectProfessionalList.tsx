import { ProfessionalProject } from "@/services/projects/professional/projects";
import styles from "./styles/ProjectProfessionalList.module.scss";
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
  const [animatingProjectId, setAnimatingProjectId] = useState<string | null>(
    null
  );
  const [returningProjectId, setReturningProjectId] = useState<string | null>(
    null
  );

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

  useEffect(() => {
    if (selectedProject === null && returningProjectId) {
      setTimeout(() => setReturningProjectId(null), 1000);
    }
  }, [selectedProject, returningProjectId]);

  const isProjectSelectedForDelete = (project: ProfessionalProject) =>
    selectedProjectsForDelete.some((p) => p.id === project.id);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const formatHours = (hours: number) => `${hours.toFixed(1)}h`;

  return (
    <div className={styles.projectListWrapper}>
      {projects.length === 0 ? (
        <p>No professional projects yet</p>
      ) : (
        projects.map((project) => {
          const projectId =
            project.id?.toString() || `project-${Math.random()}`;
          const detailText = [];

          if (project.clientName)
            detailText.push(`Client: ${project.clientName}`);
          if (project.totalHours > 0)
            detailText.push(`Hours: ${formatHours(project.totalHours)}`);
          if (project.totalSalaryCost > 0)
            detailText.push(
              `Total: ${formatCurrency(project.totalSalaryCost)}`
            );

          const isSelected =
            selectedProject && projectId === selectedProject.id?.toString();
          const isReturning = returningProjectId === projectId;
          const isSelectedForDelete = isProjectSelectedForDelete(project);

          //if (isSelected && !isReturning && !isDeleteMode) return null;

          return (
            <div
              onClick={() => handleProjectClick(project)}
              key={projectId}
              className={`
                ${styles.project}
                ${
                  project.isActive
                    ? styles["project-active"]
                    : styles["project-inactive"]
                }
                ${isSelected ? styles.projectSelected : ""}
                ${isReturning ? styles["project-returning"] : ""}
                ${
                  isDeleteMode && isSelectedForDelete
                    ? styles["project-selected-for-delete"]
                    : ""
                }
              `}
            >
              <p>
                <span className={styles.formFieldTitle}>
                  {project.baseProject?.title || `Project ${project.id}`}
                </span>
              </p>

              <p>
                <span className={styles.formField}>
                  {project.baseProject?.description || "No description"}
                </span>
              </p>

              {detailText.length > 0 && (
                <p className={styles.details}>
                  {detailText.map((detail, index) => (
                    <span key={index} className={styles.detailItem}>
                      {detail}
                    </span>
                  ))}
                </p>
              )}

              <div className={styles.statusIndicator}>
                <span
                  className={`${styles.status} ${
                    project.isActive ? styles.active : styles.inactive
                  }`}
                >
                  {project.isActive ? "Active" : "Inactive"}
                </span>
              </div>

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

      {!isDeleteMode && (
        <button onClick={handleClick} className={styles.createButton}>
          Create new Project
        </button>
      )}
    </div>
  );
};

export default ProjectsProfessionalList;

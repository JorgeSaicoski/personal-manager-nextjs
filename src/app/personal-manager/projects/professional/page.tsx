"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProjectsList from "@/components/projects/professional/ProjectProfessionalList";
import SelectedProject from "@/components/projects/professional/SelectedProjectProfessional";
import DeleteConfirmation from "@/components/projects/professional/DeleteConfirmation";
import PaginationControls from "@/components/projects/professional/PaginationControlsProfessional";
import Button from "@/components/Button";
import {
  getProfessionalProjects,
  getProfessionalProjectById,
  updateProfessionalProject,
  deleteProfessionalProject,
  deleteSelectedProjects,
  ProfessionalProject,
  UpdateProfessionalProjectRequest,
} from "@/services/projects/professional/projects";
import styles from "./page.module.scss";
import AuthRoutes from "@/components/protected-routes/AuthRoutes";

export default function ProjectsPage() {
  return (
    <AuthRoutes>
      <Suspense fallback={<p>Loading...</p>}>
        <ProjectsPageContent />
      </Suspense>
    </AuthRoutes>
  );
}

function ProjectsPageContent() {
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<ProfessionalProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProfessionalProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedProjectsForDelete, setSelectedProjectsForDelete] = useState<ProfessionalProject[]>([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Load projects on page load and when search params change
  useEffect(() => {
    loadProjects();
  }, [searchParams]);

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const page = parseInt(searchParams.get("page") || "1", 10);
      const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
      
      const response = await getProfessionalProjects(page, pageSize);
      setProjects(response.projects);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
      console.log("in page.tsx, response:")
      console.log(response)
      console.log("in page.tsx, projects:")
      console.log(projects)
    } catch (err) {
      setError("Failed to load projects");
      console.error("Error loading projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = async (projectId: string) => {
    try {
      const project = await getProfessionalProjectById(projectId);
      setSelectedProject(project);
    } catch (err) {
      setError("Failed to load project details");
      console.error("Error loading project:", err);
    }
  };

  const handleProjectUpdate = async (
    id: string,
    updateData: UpdateProfessionalProjectRequest
  ) => {
    try {
      const updatedProject = await updateProfessionalProject(id, updateData);
      
      // Update the project in the list
      setProjects(prev =>
        prev.map(project =>
          project.id.toString() === id ? updatedProject : project
        )
      );
      
      // Update selected project if it's the one being updated
      if (selectedProject && selectedProject.id.toString() === id) {
        setSelectedProject(updatedProject);
      }
    } catch (err) {
      setError("Failed to update project");
      console.error("Error updating project:", err);
      throw err;
    }
  };

  const handleProjectClose = () => {
    setSelectedProject(null);
  };

  const handleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedProjectsForDelete([]);
    setSelectedProject(null);
  };

  const handleProjectSelectForDelete = (project: ProfessionalProject) => {
    setSelectedProjectsForDelete(prev => {
      const isSelected = prev.some(p => p.id === project.id);
      if (isSelected) {
        return prev.filter(p => p.id !== project.id);
      } else {
        return [...prev, project];
      }
    });
  };

  const handleDeleteSelected = () => {
    if (selectedProjectsForDelete.length > 0) {
      setShowDeleteConfirmation(true);
    }
  };

  const confirmDelete = async () => {
    try {
      const projectIds = selectedProjectsForDelete.map(p => p.id.toString());
      
      if (projectIds.length === 1) {
        await deleteProfessionalProject(projectIds[0]);
      } else {
        await deleteSelectedProjects(projectIds);
      }
      
      // Reload projects after deletion
      await loadProjects();
      
      // Reset delete mode
      setIsDeleteMode(false);
      setSelectedProjectsForDelete([]);
      setShowDeleteConfirmation(false);
      setSelectedProject(null);
    } catch (err) {
      setError("Failed to delete projects");
      console.error("Error deleting projects:", err);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const selectAllProjects = () => {
    if (selectedProjectsForDelete.length === projects.length) {
      setSelectedProjectsForDelete([]);
    } else {
      setSelectedProjectsForDelete([...projects]);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading projects...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Professional Projects</h1>
        
        <div className={styles.controls}>
          <Button
            text={isDeleteMode ? "Cancel" : "Delete Projects"}
            onClick={handleDeleteMode}
          />
          
          {isDeleteMode && (
            <>
              <Button
                text={
                  selectedProjectsForDelete.length === projects.length
                    ? "Deselect All"
                    : "Select All"
                }
                onClick={selectAllProjects}
              />
              <Button
                text={`Delete ${selectedProjectsForDelete.length} Selected`}
                onClick={handleDeleteSelected}
                disabled={selectedProjectsForDelete.length === 0}
              />
            </>
          )}
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.content}>
        <div className={`${styles.projectsSection} ${selectedProject ? styles.withSidebar : ""}`}>
          <ProjectsList
            projects={projects}
            selectedProject={selectedProject}
            onProjectClick={handleProjectClick}
            isDeleteMode={isDeleteMode}
            selectedProjectsForDelete={selectedProjectsForDelete}
            onProjectSelectForDelete={handleProjectSelectForDelete}
          />
          
          <PaginationControls
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>

        {selectedProject && (
          <SelectedProject
            project={selectedProject}
            onUpdate={handleProjectUpdate}
            onClose={handleProjectClose}
          />
        )}
      </div>

      {showDeleteConfirmation && (
        <DeleteConfirmation
          selectedProjects={selectedProjectsForDelete}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}
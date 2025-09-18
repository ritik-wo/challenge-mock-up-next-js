"use client";
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectDetailModal, type Project } from '@/components/ProjectDetailModal';
import { NewProjectForm } from '@/components/NewProjectForm';
import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal';
import { PlusIcon, FolderIcon } from '@/components/icons';

const PROJECTS_STORAGE_KEY = 'proplens-projects';
const projectsAPI = {
  // Fetch all projects from localStorage
  getAll: (): Project[] => {
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error fetching projects from localStorage:', error);
      return [];
    }
  },

  // Save a new project to localStorage
  save: (project: any) => {
    try {
      const projects = projectsAPI.getAll();
      const newProject: Project = {
        ...project,
        createdAt: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      };
      projects.push(newProject);
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
      return newProject;
    } catch (error) {
      console.error('Error saving project to localStorage:', error);
      throw error;
    }
  },

  // Delete a project by title
  delete: (title: string) => {
    try {
      const projects = projectsAPI.getAll();
      const filteredProjects = projects.filter(p => p.title !== title);
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(filteredProjects));
    } catch (error) {
      console.error('Error deleting project from localStorage:', error);
      throw error;
    }
  }
};

export default function ProjectsPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showNewForm, setShowNewForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  // Load projects from localStorage on component mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        // Add a small delay to show the loader (optional)
        await new Promise(resolve => setTimeout(resolve, 300));
        const loadedProjects = projectsAPI.getAll();
        setProjects(loadedProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
        toast.error('Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const openFor = (p: any) => {
    const formattedProject = {
      ...p,
      coordinates: p.coordinates && typeof p.coordinates === 'object' 
        ? `${p.coordinates.lat}, ${p.coordinates.lng}`
        : p.coordinates
    };
    setSelected(formattedProject);
    setOpen(true);
  };

  const handleSaveNew = (vals: any) => {
    try {
      // Transform form data to project format
      let lat = 0, lng = 0;
      if (typeof vals.coordinates === 'string') {
        const m = vals.coordinates.match(/^\s*(-?\d{1,2}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)\s*$/);
        if (m) { lat = parseFloat(m[1]); lng = parseFloat(m[2]); }
      }
      
      const videos = Array.isArray(vals.videos)
        ? vals.videos
            .filter((v: any) => v.url)
            .map((v: any) => ({ label: v.description || 'Video', url: v.url }))
        : [];

      const projectData = {
        title: vals.name,
        url: vals.projectUrl,
        videos,
        coordinates: `${lat}, ${lng}`,
        documents: vals.documents ? Object.values(vals.documents).flat() : [],
      };

      // Save to localStorage
      const savedProject = projectsAPI.save(projectData);
      
      // Update local state
      setProjects(prev => [savedProject, ...prev]);
      setShowNewForm(false);
      
      toast.success('Project added successfully!');
    } catch (error) {
      toast.error('Failed to save project');
      console.error('Error saving project:', error);
    }
  };

  const handleDeleteClick = (title: string) => {
    setProjectToDelete(title);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (!projectToDelete) return;
    
    try {
      projectsAPI.delete(projectToDelete);
      setProjects(prev => prev.filter(p => p.title !== projectToDelete));
      toast.success('Project deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete project');
      console.error('Error deleting project:', error);
    } finally {
      setProjectToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  const handleCancelDelete = () => {
    setProjectToDelete(null);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header / Hero */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl sm:text-xl font-semibold">Details about our projects</h1>
          <p className="mt-1 text-sm text-gray-500">Upload and manage project documentation and details</p>
        </div>
        <button className="self-start inline-flex items-center gap-2 rounded-lg bg-black text-white h-9 px-3 text-sm font-medium hover:bg-black/90" data-testid="add-project" onClick={() => setShowNewForm((s) => !s)}>
          <PlusIcon className="w-4 h-4" />
          Add New Project
        </button>
      </div>

      {showNewForm && (
        <NewProjectForm
          onCancel={() => setShowNewForm(false)}
          onSave={handleSaveNew}
        />
      )}

      {/* Existing Projects */}
      <section className="card p-4">
        <div className="text-sm text-gray-900 mb-4">Existing Projects</div>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading projects...</h3>
            <p className="text-gray-500">Please wait while we fetch your projects</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="space-y-3">
            {projects.map((p) => (
              <ProjectCard
                key={p.title}
                title={p.title}
                createdAt={p.createdAt}
                onView={() => openFor(p)}
                onDelete={() => handleDeleteClick(p.title)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <FolderIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-4">Get started by creating your first project</p>
            <button 
              onClick={() => setShowNewForm(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-black text-white h-9 px-4 text-sm font-medium hover:bg-black/90"
            >
              <PlusIcon className="w-4 h-4" />
              Add Your First Project
            </button>
          </div>
        )}
      </section>

      {/* SharePoint footer */}
      <section className="card p-4">
        <div className="text-sm font-medium mb-2">Sharepoint link for project related sales brochures and documents</div>
        <input
          aria-label="SharePoint link"
          className="w-full rounded-lg border border-gray-200 bg-white text-gray-700 px-3 py-2 placeholder:text-gray-400 placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400"
          placeholder="https://sharepoint.com/..."
        />
      </section>

      <ProjectDetailModal open={open} onClose={() => setOpen(false)} project={selected} />
      <ConfirmDeleteModal 
        open={showDeleteConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you would like to delete this project?`}
      />
      <Toaster position="top-right" />
    </div>
  );
}

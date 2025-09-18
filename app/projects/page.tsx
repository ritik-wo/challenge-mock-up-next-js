"use client";
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectDetailModal, type Project } from '@/components/ProjectDetailModal';
import { NewProjectForm } from '@/components/NewProjectForm';
import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal';
import { PlusIcon, FolderIcon } from '@/components/icons';
import { PageHeader } from '@/components/PageHeader';

const PROJECTS_STORAGE_KEY = 'proplens-projects';

const DEFAULT_PROJECTS: Project[] = [
  {
    title: "Skyline Towers",
    url: "https://skylinetowers.com",
    videos: [
      {
        label: "Project Overview Video",
        url: "https://youtube.com/watch?v=sample1"
      },
      {
        label: "Virtual Tour",
        url: "https://vimeo.com/sample2"
      }
    ],
    coordinates: "19.076, 72.8777",
    documents: [
      {
        name: "Skyline_Towers_Brochure.pdf",
        type: "PDF Document"
      }
    ],
    createdAt: "2025-08-15"
  },
  {
    title: "Garden Residency",
    url: "https://gardenresidency.com",
    videos: [
      {
        label: "Amenities Showcase",
        url: "https://youtube.com/watch?v=sample3"
      }
    ],
    coordinates: "19.1136, 72.8697",
    documents: [
      {
        name: "Garden_Residency_Brochure.pdf",
        type: "PDF Document"
      }
    ],
    createdAt: "2025-08-15"
  }
];

const projectsAPI = {
  getAll: (): Project[] => {
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      const userProjects = stored ? JSON.parse(stored) : [];
      
      const filteredUserProjects = userProjects.filter((userProject: Project) => 
        !DEFAULT_PROJECTS.some(defaultProject => defaultProject.title === userProject.title)
      );
      
      return [...DEFAULT_PROJECTS, ...filteredUserProjects];
    } catch (error) {
      console.error('Error fetching projects from localStorage:', error);
      return DEFAULT_PROJECTS;
    }
  },

  save: (project: any) => {
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      const userProjects = stored ? JSON.parse(stored) : [];
      
      const newProject: Project = {
        ...project,
        createdAt: new Date().toISOString().split('T')[0],
      };
      
      userProjects.push(newProject);
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(userProjects));
      return newProject;
    } catch (error) {
      console.error('Error saving project to localStorage:', error);
      throw error;
    }
  },

  delete: (title: string) => {
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      const userProjects = stored ? JSON.parse(stored) : [];
      
      const filteredUserProjects = userProjects.filter((p: Project) => p.title !== title);
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(filteredUserProjects));
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

  useEffect(() => {
    const loadProjects = async () => {
      try {
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

      const savedProject = projectsAPI.save(projectData);
      
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
    <div className="space-y-6 -mt-4">
      <PageHeader
        title="Details about our projects"
        subtitle="Upload and manage project documentation and details"
        rightSlot={(
          <button className="self-start inline-flex items-center gap-2 rounded-lg bg-black text-white h-9 px-3 text-sm font-medium hover:bg-black/90 shrink-0 whitespace-nowrap" data-testid="add-project" onClick={() => setShowNewForm((s) => !s)}>
            <PlusIcon className="w-4 h-4" />
            Add New Project
          </button>
        )}
      />

      {showNewForm && (
        <NewProjectForm
          onCancel={() => setShowNewForm(false)}
          onSave={handleSaveNew}
        />
      )}
      <section className="card p-6">
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

      <section className="card p-4">
        <div className="text-sm font-medium mb-2">Sharepoint link for project related sales brochures and documents</div>
        <input
          aria-label="SharePoint link"
          className="w-[65%] rounded-lg border border-gray-200 bg-gray-100 text-gray-700 px-2 py-1.5 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 focus:shadow-sm"
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

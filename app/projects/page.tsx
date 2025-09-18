"use client";
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectDetailModal, type Project } from '@/components/ProjectDetailModal';
import { NewProjectForm } from '@/components/NewProjectForm';
import { PlusIcon } from '@/components/icons';

const defaultProjects = [
  {
    title: 'Skyline Towers',
    projectUrl: 'https://skylinetowers.com',
    videos: [
      { label: 'Project Overview Video', url: 'https://youtube.com/watch?v=sample1' },
      { label: 'Virtual Tour', url: 'https://vimeo.com/sample2' }
    ],
    coordinates: { lat: 19.0760, lng: 72.8777 },
    documents: [{ name: 'Skyline_Towers_Brochure.pdf', type: 'PDF Document' }],
    createdAt: '2025-08-15'
  },
  {
    title: 'Garden Residency',
    projectUrl: 'https://gardenresidency.com',
    videos: [
      { label: 'Amenities Showcase', url: 'https://youtube.com/watch?v=sample3' }
    ],
    coordinates: { lat: 19.1136, lng: 72.8697 },
    documents: [{ name: 'Garden_Residency_Brochure.pdf', type: 'PDF Document' }],
    createdAt: '2025-08-15'
  }
];


export default function ProjectsPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [items, setItems] = useState(defaultProjects);

  const openFor = (p: {
    title: string;
    projectUrl?: string;
    videos?: Array<{ label: string; url: string }>;
    coordinates?: { lat: number; lng: number };
    documents?: Array<{ name: string; type?: string }>;
    createdAt: string;
  }) => {
    const project: Project = {
      title: p.title,
      createdAt: p.createdAt,
      url: p.projectUrl,
      videos: p.videos,
      coordinates: p.coordinates ? `${p.coordinates.lat}, ${p.coordinates.lng}` : undefined,
      documents: p.documents,
    };
    setSelected(project);
    setOpen(true);
  };

  const handleSaveNew = (vals: any) => {
    // vals comes from NewProjectForm: { name, projectUrl, coordinates, videos: [{url, description}], documents: {...} }
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
    const today = new Date().toISOString().slice(0, 10);
    const newItem = {
      title: vals.name,
      projectUrl: vals.projectUrl,
      videos,
      coordinates: { lat, lng },
      documents: [],
      createdAt: today,
    };
    setItems((prev) => [newItem, ...prev]);
    setShowNewForm(false);
    
    // Show success toast
    toast.success('Project added successfully!');
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
        <div className="space-y-3">
          {items.map((p) => (
            <ProjectCard
              key={p.title}
              title={p.title}
              createdAt={p.createdAt}
              onView={() => openFor(p)}
            />
          ))}
        </div>
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
      <Toaster position="top-right" />
    </div>
  );
}

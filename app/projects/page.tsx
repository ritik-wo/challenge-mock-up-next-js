"use client";
import React from 'react';
import { ProjectCard } from '@/components/ProjectCard';

const projects = [
  { title: 'Skyline Towers', createdAt: '2025-08-15' },
  { title: 'Garden Residency', createdAt: '2025-08-15' },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      {/* Header / Hero */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl sm:text-xl font-semibold">Details about our projects</h1>
          <p className="mt-1 text-sm text-gray-500">Upload and manage project documentation and details</p>
        </div>
        <button className="self-start inline-flex items-center gap-2 rounded-lg bg-black text-white h-9 px-3 text-sm font-medium hover:bg-black/90" data-testid="add-project">
          <span className="grid place-items-center h-5 w-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
          </span>
          Add New Project
        </button>
      </div>

      {/* Existing Projects */}
      <section className="card p-4">
        <div className="text-sm text-gray-900 mb-4">Existing Projects</div>
        <div className="space-y-3">
          {projects.map((p) => (
            <ProjectCard key={p.title} title={p.title} createdAt={p.createdAt} />
          ))}
        </div>
      </section>

      {/* SharePoint footer */}
      <section className="card p-4">
        <div className="text-sm font-medium mb-2">Sharepoint link for project related sales brochures and documents</div>
        <input
          aria-label="SharePoint link"
          className="w-full rounded-lg border border-gray-200 bg-white text-gray-700 px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400"
          placeholder="https://sharepoint.com/..."
        />
      </section>
    </div>
  );
}

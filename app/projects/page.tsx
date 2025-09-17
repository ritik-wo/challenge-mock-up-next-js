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
          <h1 className="text-xl sm:text-2xl font-semibold">Details about our projects</h1>
          <p className="mt-1 text-sm text-gray-600">Upload and manage project documentation and details</p>
        </div>
        <button className="btn-primary self-start" data-testid="add-project">+ Add New Project</button>
      </div>

      {/* Existing Projects */}
      <section className="card p-4 space-y-3">
        <div className="text-sm text-gray-600">Existing Projects</div>
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
          className="w-full rounded-lg border border-gray-200 bg-gray-100 text-gray-500 px-3 py-2"
          placeholder="https://sharepoint.com/..."
          disabled
        />
      </section>
    </div>
  );
}

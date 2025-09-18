"use client";
import React from 'react';
import { CalendarIcon } from './icons';
import { FolderIcon, LinkIcon, VideoIcon, MapPinIcon, FileIcon } from './icons';

export type Project = {
  title: string;
  createdAt: string;
  url?: string;
  videos?: Array<{ label: string; url: string }>;
  coordinates?: string; // e.g., "19.0760, 72.8777"
  documents?: Array<{ name: string; type?: string }>;
};

export type ProjectDetailModalProps = {
  open: boolean;
  onClose: () => void;
  project: Project | null;
};

export function ProjectDetailModal({ open, onClose, project }: ProjectDetailModalProps) {
  if (!open || !project) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <div className="fixed inset-0 overflow-y-auto px-4 sm:px-6 py-10">
        <div className="mx-auto max-w-[38.4rem] rounded-xl bg-white shadow-soft border">
          {/* Header */}
          <div className="flex items-start justify-between border-b px-6 pt-6 pb-4">
            <div>
              <h2 className="text-lg font-semibold">Project Details</h2>
              <p className="text-sm text-gray-500">Complete project information and documentation</p>
            </div>
            <button onClick={onClose} className="text-sm text-gray-600 hover:text-gray-900">✕ Close</button>
          </div>

          {/* Content */}
          <div className="px-6 pt-6 pb-6 space-y-4">
            {/* Project Name */}
            <div>
              <div className="text-sm font-medium mb-2 flex items-center gap-2 text-gray-900">
                <FolderIcon className="w-4 h-4 text-gray-500" />
                Project Name
              </div>
              <div className="rounded-md bg-gray-100 border px-4 py-3 text-sm text-gray-700">{project.title}</div>
            </div>

            {/* Project URL */}
            {project.url && (
              <div>
                <div className="text-sm font-medium mb-2 flex items-center gap-2 text-gray-900">
                  <LinkIcon className="w-4 h-4 text-gray-500" />
                  Project URL
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-md bg-gray-100 border px-4 py-3 text-sm text-gray-700 truncate">{project.url}</div>
                  <a className="inline-flex items-center gap-2 rounded-md border bg-white h-8 px-3 text-sm hover:bg-gray-50" href={project.url} target="_blank" rel="noreferrer">Open</a>
                </div>
              </div>
            )}

            {/* Videos */}
            {!!project.videos?.length && (
              <div className="space-y-3">
                <div className="text-sm font-medium flex items-center gap-2 text-gray-900"><VideoIcon className="w-4 h-4 text-gray-500" /> Project Video Links</div>
                {project.videos!.map((v) => (
                  <div key={v.url} className="flex items-center justify-between rounded-md bg-gray-100 border px-4 py-3">
                    <div className="flex items-start gap-2">
                      <VideoIcon className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">{v.label}</div>
                        <div className="text-xs text-gray-600">{v.url}</div>
                      </div>
                    </div>
                    <a href={v.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border bg-white h-8 px-3 text-sm hover:bg-gray-50">Watch</a>
                  </div>
                ))}
              </div>
            )}

            {/* Coordinates */}
            {project.coordinates && (
              <div>
                <div className="text-sm font-medium mb-2 flex items-center gap-2 text-gray-900">
                  <MapPinIcon className="w-4 h-4 text-gray-500" />
                  Google Coordinates
                </div>
                <div className="rounded-md bg-gray-100 border px-4 py-3 text-sm text-gray-700">{project.coordinates}</div>
              </div>
            )}

            {/* Documents */}
            {!!project.documents?.length && (
              <div className="space-y-2">
                <div className="text-sm font-medium flex items-center gap-2 text-gray-900"><FileIcon className="w-4 h-4 text-gray-500" /> Project Documents</div>
                {project.documents!.map((d) => (
                  <div key={d.name} className="flex items-center justify-between rounded-md bg-gray-100 border px-4 py-3">
                    <div className="flex items-start gap-2">
                      <FileIcon className="w-4 h-4 text-red-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">{d.name}</div>
                        <div className="text-xs text-gray-600">{d.type ?? 'Document'}</div>
                      </div>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-md border bg-white h-8 px-3 text-sm hover:bg-gray-50">View</button>
                  </div>
                ))}
              </div>
            )}

            {/* Created Date */}
            <div>
              <div className="text-sm font-medium mb-2 flex items-center gap-2 text-gray-900">
                {/* calendar icon */}
                <CalendarIcon className="w-4 h-4 text-gray-500" />
                Created Date
              </div>
              <div className="rounded-md bg-gray-100 border px-4 py-3 text-sm text-gray-700">{project.createdAt}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

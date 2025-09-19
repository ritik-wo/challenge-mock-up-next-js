"use client";
import React, { useRef, useEffect } from 'react';
import { FolderIcon, LinkIcon, VideoIcon, MapPinIcon, FileIcon } from './icons';
import { ViewButton } from './ActionButtons';
import { colors } from '../styles/colors';

export type Project = {
  title: string;
  createdAt: string;
  url?: string;
  videos?: Array<{ label: string; url: string }>;
  coordinates?: string;
  documents?: Array<{ name: string; type?: string }>;
};

export type ProjectDetailModalProps = {
  open: boolean;
  onClose: () => void;
  project: Project | null;
};

export function ProjectDetailModal({ open, onClose, project }: ProjectDetailModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  if (!open || !project) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="project-details-title">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto px-4 sm:px-6 py-10">
        <div className="mx-auto max-w-[38.4rem] rounded-xl bg-white shadow-soft border">
          <div className="flex items-start justify-between border-b px-6 pt-6 pb-4">
            <div>
              <h2 id="project-details-title" className="text-lg font-semibold">Project Details</h2>
              <p className={`text-sm ${colors.text.tertiary}`}>Complete project information and documentation</p>
            </div>
            <button ref={closeBtnRef} onClick={onClose} className={`text-sm font-semibold ${colors.text.quaternary} ${colors.hover.text} ${colors.hover.medium} px-2 py-1 rounded transition-colors`}>✕ Close</button>
          </div>
          <div className="px-6 pt-6 pb-6 space-y-4">
            <div>
              <div className={`text-sm font-medium mb-2 flex items-center gap-2 ${colors.text.primary}`}>
                <FolderIcon className={`w-4 h-4 ${colors.text.tertiary}`} />
                Project Name
              </div>
              <div className={`rounded-md ${colors.bg.tertiary} border px-4 py-3 text-sm ${colors.text.secondary}`}>{project.title}</div>
            </div>
            {project.url && (
              <div>
                <div className={`text-sm font-medium mb-2 flex items-center gap-2 ${colors.text.primary}`}>
                  <LinkIcon className={`w-4 h-4 ${colors.text.tertiary}`} />
                  Project URL
                </div>
                <div className={`flex items-center justify-between rounded-md ${colors.bg.tertiary} border px-4 py-3`}>
                  <div className={`text-sm ${colors.text.secondary} truncate flex-1`}>{project.url}</div>
                  <a className={`inline-flex items-center gap-2 rounded-md border ${colors.bg.primary} h-8 px-3 text-sm font-semibold ${colors.hover.light} ml-2`} href={project.url} target="_blank" rel="noreferrer">
                    <LinkIcon className="w-4 h-4" />
                    Open
                  </a>
                </div>
              </div>
            )}
            {!!project.videos?.length && (
              <div className="space-y-2">
                <div className={`text-sm font-medium flex items-center gap-2 ${colors.text.primary}`}><VideoIcon className={`w-4 h-4 ${colors.text.tertiary}`} /> Project Video Links</div>
                {project.videos!.map((v) => (
                  <div key={v.url} className={`flex items-center justify-between rounded-md ${colors.bg.tertiary} border px-5 py-4`}>
                    <div className="flex items-start">
                      <VideoIcon className="w-4 h-4 text-blue-600 mt-0.5 mr-2" />
                      <div>
                        <div className="text-sm font-medium mb-2">{v.label}</div>
                        <div className={`text-xs ${colors.text.quaternary} -ml-6`}>{v.url}</div>
                      </div>
                    </div>
                    <a href={v.url} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-md border ${colors.bg.primary} h-8 px-3 text-sm font-semibold ${colors.hover.light}`}>
                      <VideoIcon className="w-4 h-4" />
                      Watch
                    </a>
                  </div>
                ))}
              </div>
            )}
            {project.coordinates && (
              <div>
                <div className={`text-sm font-medium mb-2 flex items-center gap-2 ${colors.text.primary}`}>
                  <MapPinIcon className={`w-4 h-4 ${colors.text.tertiary}`} />
                  Google Coordinates
                </div>
                <div className={`rounded-md ${colors.bg.tertiary} border px-4 py-3 text-sm ${colors.text.secondary}`}>{project.coordinates}</div>
              </div>
            )}
            <div className="space-y-2">
              <div className={`text-sm font-medium flex items-center gap-2 ${colors.text.primary}`}>
                <FileIcon className={`w-4 h-4 ${colors.text.tertiary}`} /> Project Documents
              </div>
              <div className={`flex items-center justify-between rounded-md ${colors.bg.tertiary} border px-4 py-3`}>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded bg-red-100 flex items-center justify-center mt-0.5">
                    <FileIcon className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Sample_Project_Brochure.pdf</div>
                    <div className={`text-xs ${colors.text.quaternary}`}>PDF Document</div>
                  </div>
                </div>
                <ViewButton onClick={() => {}} />
              </div>
            </div>
            <div>
              <div className={`text-sm font-medium mb-2 flex items-center gap-2 ${colors.text.primary}`}>
                <FolderIcon className={`w-4 h-4 ${colors.text.tertiary}`} />
                Created Date
              </div>
              <div className={`rounded-md ${colors.bg.tertiary} border px-4 py-3 text-sm ${colors.text.secondary}`}>{project.createdAt}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

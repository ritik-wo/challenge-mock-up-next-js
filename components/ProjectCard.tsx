import React from 'react';
import clsx from 'clsx';

export type ProjectCardProps = {
  title: string;
  createdAt: string;
};

export function ProjectCard({ title, createdAt }: ProjectCardProps) {
  return (
    <div className="card p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 grid place-items-center rounded-lg bg-gray-100 border">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h18M3 7l3-4h6l3 4M5 7v13h14V7"/></svg>
        </div>
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-xs text-gray-500">Created: {createdAt}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className={clsx('px-3 py-1.5 text-sm rounded-lg border bg-white hover:bg-gray-50')}>View</button>
        <button className={clsx('px-3 py-1.5 text-sm rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-100')}>Delete</button>
      </div>
    </div>
  );
}

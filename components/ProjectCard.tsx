import React from 'react';
import { FolderIcon, EyeIcon, Trash2Icon } from './icons';
import clsx from 'clsx';

export type ProjectCardProps = {
  title: string;
  createdAt: string;
  onView?: () => void;
  onDelete?: () => void;
};

export function ProjectCard({ title, createdAt, onView, onDelete }: ProjectCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-6">
      <div className="flex items-center gap-3">
        {/* Folder icon (plain) */}
        <FolderIcon className="w-5 h-5 text-gray-500" />
        <div>
          <div className="text-sm font-semibold text-gray-900">{title}</div>
          <div className="text-xs text-gray-500">Created: {createdAt}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          aria-label={`View ${title}`}
          className={clsx('inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white h-8 px-3 text-sm font-medium text-gray-800 hover:bg-gray-50')}
          onClick={onView}
        >
          {/* Eye icon */}
          <EyeIcon className="w-4 h-4" />
          View
        </button>
        <button
          aria-label={`Delete ${title}`}
          className={clsx('inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white h-8 px-3 text-sm font-medium text-gray-800 hover:bg-gray-50')}
          onClick={onDelete}
        >
          {/* Trash2 icon */}
          <Trash2Icon className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}

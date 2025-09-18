import React from 'react';
import { FolderIcon } from './icons';
import { ViewButton, DeleteButton } from './ActionButtons';

export type ProjectCardProps = {
  title: string;
  createdAt: string;
  onView?: () => void;
  onDelete?: () => void;
};

export function ProjectCard({ title, createdAt, onView, onDelete }: ProjectCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-4">
      <div className="flex items-center gap-3">
        <FolderIcon className="w-5 h-5 text-gray-500" />
        <div>
          <div className="text-base font-semibold text-gray-900">{title}</div>
          <div className="text-base text-gray-500">Created: {createdAt}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ViewButton onClick={onView || (() => {})} />
        <DeleteButton onClick={onDelete || (() => {})} />
      </div>
    </div>
  );
}

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
    <div className="flex sm:items-center items-start justify-between rounded-xl border border-gray-200 bg-white px-4 py-4">
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <FolderIcon className="w-5 h-5 text-gray-500" />
        <div className="min-w-0">
          <div className="text-base font-semibold text-gray-900">{title}</div>
          <div className="text-base text-gray-500">Created: {createdAt}</div>
        </div>
      </div>
      <div className="flex gap-2 items-center shrink-0 whitespace-nowrap">
        <ViewButton onClick={onView || (() => {})} />
        <DeleteButton onClick={onDelete || (() => {})} />
      </div>
    </div>
  );
}

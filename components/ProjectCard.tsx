import React from 'react';
import { FolderIcon } from './icons';
import { ViewButton, DeleteButton } from './ActionButtons';
import { colors } from '../styles/colors';

export type ProjectCardProps = {
  title: string;
  createdAt: string;
  onView?: () => void;
  onDelete?: () => void;
};

export function ProjectCard({ title, createdAt, onView, onDelete }: ProjectCardProps) {
  return (
    <div className={`flex items-center justify-between rounded-xl border ${colors.border.light} ${colors.bg.primary} px-4 py-4`}>
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <FolderIcon className={`w-5 h-5 ${colors.text.tertiary}`} />
        <div className="min-w-0">
          <div className={`text-base font-semibold ${colors.text.primary}`}>{title}</div>
          <div className={`text-base ${colors.text.tertiary}`}>Created: {createdAt}</div>
        </div>
      </div>
      <div className="flex gap-2 items-center shrink-0 whitespace-nowrap">
        <ViewButton onClick={onView || (() => {})} />
        <DeleteButton onClick={onDelete || (() => {})} />
      </div>
    </div>
  );
}

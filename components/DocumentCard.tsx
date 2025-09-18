"use client";
import React from 'react';
import { FileTextIcon } from './icons';
import { ViewButton, DeleteButton } from './ActionButtons';
import { colors } from '../styles/colors';

export type Document = {
  id: string;
  name: string;
  uploadDate: string;
  fileSize: string;
  category: string;
};

export type DocumentCardProps = {
  document: Document;
  onView: () => void;
  onDelete: () => void;
};

export function DocumentCard({ document, onView, onDelete }: DocumentCardProps) {
  return (
    <div className={`flex items-center justify-between ${colors.bg.primary} rounded-lg p-4 border ${colors.border.light} hover:${colors.border.medium} transition-colors`}>
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-5 h-5 flex items-center justify-center">
          <FileTextIcon className="w-5 h-5 text-blue-600" />
        </div>
        <div className="min-w-0">
          <div className={`text-base font-medium ${colors.text.primary}`}>{document.name}</div>
          <div className={`text-sm ${colors.text.tertiary}`}>
            Uploaded: {document.uploadDate} • {document.fileSize}
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 items-center shrink-0 whitespace-nowrap">
        <ViewButton onClick={onView} />
        <DeleteButton onClick={onDelete} />
      </div>
    </div>
  );
}

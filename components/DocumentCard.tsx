"use client";
import React from 'react';
import { FileIcon } from './icons';
import { ViewButton, DeleteButton } from './ActionButtons';

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
    <div className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
          <FileIcon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900">{document.name}</div>
          <div className="text-xs text-gray-500">
            Uploaded: {document.uploadDate} • {document.fileSize}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <ViewButton onClick={onView} />
        <DeleteButton onClick={onDelete} />
      </div>
    </div>
  );
}

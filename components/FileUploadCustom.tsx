"use client";
import React, { useRef, useState } from 'react';

export type FileUploadCustomProps = {
  onFilesSelected?: (files: FileList) => void;
  buttonLabel?: string;
  title?: string; // e.g., "Upload files"
  subtitle?: string; // e.g., "Drag and drop files here or click to browse"
  className?: string;
};

export function FileUploadCustom({ onFilesSelected, buttonLabel = 'Select Files', title = 'Upload files', subtitle = 'Drag and drop files here or click to browse', className = '' }: FileUploadCustomProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      onFilesSelected?.(e.dataTransfer.files);
    }
  };

  return (
    <div
      className={`rounded-lg border border-dashed ${isDragging ? 'border-gray-400' : 'border-gray-300'} p-4 ${className}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
    >
      <div className="grid place-items-center bg-white">
        <div className="h-8 w-8 rounded-full bg-gray-100 text-gray-600 grid place-items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 5 17 10"/><line x1="12" x2="12" y1="5" y2="19"/></svg>
        </div>
        <div className="text-sm font-medium text-gray-800">{title}</div>
        <div className="text-xs text-gray-500 mb-3">{subtitle}</div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border bg-white h-8 px-3 text-sm hover:bg-gray-50"
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
        >
          {buttonLabel}
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) onFilesSelected?.(e.target.files);
          }}
        />
      </div>
    </div>
  );
}

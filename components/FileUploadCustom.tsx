"use client";
import React, { useRef, useState } from 'react';
import { UploadIcon } from './icons';
import { colors } from '../styles/colors';

export type FileUploadCustomProps = {
  onFilesSelected?: (files: FileList) => void;
  buttonLabel?: string;
  title?: string; // e.g., "Upload files"
  subtitle?: string; // e.g., "Drag and drop files here or click to browse"
  className?: string;
  multiple?: boolean; // Allow multiple files or single file only
  acceptedTypes?: string[]; // Allowed file types, e.g., ['pdf', 'jpg', 'jpeg']
};

export function FileUploadCustom({ 
  onFilesSelected, 
  buttonLabel = 'Select Files', 
  title = 'Upload files', 
  subtitle = 'Drag and drop files here or click to browse', 
  className = '', 
  multiple = true,
  acceptedTypes = ['pdf', 'jpg', 'jpeg']
}: FileUploadCustomProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const isValidFileType = (file: File) => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return fileExtension && acceptedTypes.includes(fileExtension);
  };

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).filter(isValidFileType);
    
    if (newFiles.length === 0) {
      return; // Silently ignore invalid files
    }

    if (multiple) {
      // Multiple files allowed - add to existing
      setUploadedFiles(prev => [...prev, ...newFiles]);
    } else {
      // Single file only - replace existing
      setUploadedFiles(newFiles.slice(0, 1));
    }
    
    // Create a new FileList-like object for the callback
    const dataTransfer = new DataTransfer();
    newFiles.forEach(file => dataTransfer.items.add(file));
    onFilesSelected?.(dataTransfer.files);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={className}>
      {/* Upload Area */}
      <div
        className={`rounded-lg ${isDragging ? 'border-2 border-dashed border-red-500' : 'border-2 border-dashed border-gray-300 hover:border-gray-600'} p-8`}
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
          <div className="h-10 w-10 rounded-full bg-gray-100 text-gray-600 grid place-items-center mb-3">
            <UploadIcon className="w-5 h-5" />
          </div>
          <div className="text-sm font-medium text-gray-900 mb-1">{title}</div>
          <div className="text-xs text-gray-500 mb-4">{subtitle}</div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white h-8 px-3 text-sm text-gray-700 hover:bg-gray-50"
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
            multiple={multiple}
            accept={acceptedTypes.map(type => `.${type}`).join(',')}
            className="hidden"
            onChange={(e) => {
              if (e.target.files) handleFiles(e.target.files);
            }}
          />
        </div>
      </div>
      
      {/* Uploaded Files List - Outside the dashed box */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Uploaded Files ({uploadedFiles.length})
          </div>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{file.name}</div>
                    <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                  aria-label={`Remove ${file.name}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

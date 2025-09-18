"use client";
import React, { useState } from 'react';
import { FileUploadCustom } from './FileUploadCustom';
import { DocumentCard, type Document } from './DocumentCard';
import { DocumentPreviewModal } from './DocumentPreviewModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import toast from 'react-hot-toast';

export type DocumentSectionProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  currentSectionTitle: string;
  staticDocuments: Document[];
  className?: string;
};

export function DocumentSection({
  title,
  description,
  icon,
  iconBgColor = 'bg-blue-50',
  currentSectionTitle,
  staticDocuments,
  className = ''
}: DocumentSectionProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [modalType, setModalType] = useState<'preview' | 'delete'>('preview');

  const handleFilesSelected = (files: FileList) => {
    toast.success(`${files.length} file(s) selected for upload!`);
  };

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setModalType('preview');
    setShowPreview(true);
  };

  const handleDeleteDocument = () => {
    setModalType('delete');
    setShowPreview(true);
  };

  return (
    <div className={className}>
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-lg ${iconBgColor} flex items-center justify-center flex-shrink-0 mt-1`}>
            {icon}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <FileUploadCustom
          onFilesSelected={handleFilesSelected}
          multiple={true}
          acceptedTypes={['pdf', 'doc', 'docx', 'ppt', 'pptx']}
          title="Upload files"
          subtitle="Drag and drop files here or click to browse"
        />
        {staticDocuments.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium text-gray-900">
                {currentSectionTitle}
              </h3>
              <span className="text-sm text-gray-500">
                {staticDocuments.length} document{staticDocuments.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="space-y-3">
              {staticDocuments.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  onView={() => handleViewDocument(document)}
                  onDelete={handleDeleteDocument}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <DocumentPreviewModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        document={selectedDocument}
        type={modalType}
      />
    </div>
  );
}

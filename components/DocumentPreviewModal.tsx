"use client";
import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FileIcon } from './icons';
import type { Document } from './DocumentCard';
import { colors } from '../styles/colors';

export type DocumentPreviewModalProps = {
  open: boolean;
  onClose: () => void;
  document: Document | null;
  type?: 'preview' | 'delete';
};

export function DocumentPreviewModal({ open, onClose, document: documentData, type = 'preview' }: DocumentPreviewModalProps) {
  const [mounted, setMounted] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open || !documentData) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0,
        padding: 0
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="document-preview-title"
    >
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className={`relative ${colors.bg.primary} rounded-lg p-6 w-full max-w-md mx-4 z-10`}>
        <div className="text-center">
          <div className={`w-12 h-12 mx-auto mb-4 rounded-full ${colors.bg.tertiary} flex items-center justify-center`}>
            <FileIcon className={`w-6 h-6 ${colors.text.muted}`} />
          </div>
          <h3 id="document-preview-title" className={`text-lg font-medium ${colors.text.primary} mb-2`}>
            {type === 'delete' ? 'Cannot Delete Document' : 'Document Preview'}
          </h3>
          <p className={`${colors.text.quaternary} mb-6`}>
            {type === 'delete' 
              ? 'This is a static document and cannot be deleted' 
              : 'This is not an actual document'
            }
          </p>
          <button
            type="button"
            ref={closeBtnRef}
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-black/90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

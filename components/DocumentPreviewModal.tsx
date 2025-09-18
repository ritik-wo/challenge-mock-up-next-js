"use client";
import React from 'react';
import { createPortal } from 'react-dom';
import { FileIcon } from './icons';
import type { Document } from './DocumentCard';

export type DocumentPreviewModalProps = {
  open: boolean;
  onClose: () => void;
  document: Document | null;
  type?: 'preview' | 'delete';
};

export function DocumentPreviewModal({ open, onClose, document: documentData, type = 'preview' }: DocumentPreviewModalProps) {
  const [mounted, setMounted] = React.useState(false);
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const prevActiveRef = React.useRef<Element | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    prevActiveRef.current = document.activeElement;
    const id = window.setTimeout(() => closeBtnRef.current?.focus({ preventScroll: true }), 0);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown, { capture: true });
    return () => {
      window.clearTimeout(id);
      document.removeEventListener('keydown', onKeyDown, { capture: true } as any);
      if (prevActiveRef.current instanceof HTMLElement) {
        prevActiveRef.current.focus({ preventScroll: true });
      }
    };
  }, [open, onClose]);

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
      
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4 z-10">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <FileIcon className="w-6 h-6 text-gray-400" />
          </div>
          <h3 id="document-preview-title" className="text-lg font-medium text-gray-900 mb-2">
            {type === 'delete' ? 'Cannot Delete Document' : 'Document Preview'}
          </h3>
          <p className="text-gray-600 mb-6">
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

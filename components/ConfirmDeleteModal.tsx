"use client";
import React from 'react';
import { createPortal } from 'react-dom';

export type ConfirmDeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
};

export function ConfirmDeleteModal({ 
  open, 
  onClose, 
  onConfirm, 
  title = "Confirm Deletion",
  message = "Are you sure you would like to delete the file?"
}: ConfirmDeleteModalProps) {
  const [mounted, setMounted] = React.useState(false);
  const cancelBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const prevActiveRef = React.useRef<Element | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    prevActiveRef.current = document.activeElement;
    const id = window.setTimeout(() => cancelBtnRef.current?.focus({ preventScroll: true }), 0);
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
      if (prevActiveRef.current instanceof HTMLElement) prevActiveRef.current.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

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
      aria-labelledby="confirm-delete-title"
    >
      
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4 z-10">
        <h2 id="confirm-delete-title" className="text-lg font-medium text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            ref={cancelBtnRef}
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            No
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-black/90 rounded-md transition-colors"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

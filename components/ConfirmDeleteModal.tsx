"use client";
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { colors } from '../styles/colors';

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
  const [mounted, setMounted] = useState(false);
  const cancelBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <h2 id="confirm-delete-title" className={`text-lg font-medium ${colors.text.primary} mb-3`}>{title}</h2>
        <p className={`${colors.text.quaternary} mb-6`}>{message}</p>
        
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            ref={cancelBtnRef}
            onClick={onClose}
            className={`px-4 py-2 text-sm font-medium ${colors.text.secondary} ${colors.bg.tertiary} hover:${colors.bg.quaternary} rounded-md transition-colors`}
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

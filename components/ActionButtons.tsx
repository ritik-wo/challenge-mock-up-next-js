"use client";
import React from 'react';
import { EyeOutlineIcon, TrashOutlineIcon } from './icons';

export type ViewButtonProps = {
  onClick: () => void;
  className?: string;
};

export type DeleteButtonProps = {
  onClick: () => void;
  className?: string;
};

export function ViewButton({ onClick, className = '' }: ViewButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors ${className}`}
    >
      <EyeOutlineIcon className="w-4 h-4" />
      View
    </button>
  );
}

export function DeleteButton({ onClick, className = '' }: DeleteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors ${className}`}
    >
      <TrashOutlineIcon className="w-4 h-4" />
      Delete
    </button>
  );
}

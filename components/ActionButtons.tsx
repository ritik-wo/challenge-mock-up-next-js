"use client";
import React from 'react';
import { EyeOutlineIcon, TrashOutlineIcon } from './icons';
import { colors } from '../styles/colors';

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
      className={`inline-flex items-center gap-1 rounded-md border ${colors.border.medium} ${colors.bg.primary} h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm font-medium ${colors.text.secondary} ${colors.hover.light} transition-colors ${className}`}
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
      className={`inline-flex items-center gap-1 rounded-md border ${colors.border.medium} ${colors.bg.primary} h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm font-medium ${colors.text.secondary} ${colors.hover.light} transition-colors ${className}`}
    >
      <TrashOutlineIcon className="w-4 h-4" />
      Delete
    </button>
  );
}

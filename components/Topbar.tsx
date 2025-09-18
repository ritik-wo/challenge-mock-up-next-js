"use client";
import React from 'react';
import { MenuIcon } from './icons';
import { colors } from '../styles/colors';

export type TopbarProps = {
  onMenuClick: () => void;
};

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <div className="sticky top-0 z-30 bg-gray-50/80 backdrop-blur supports-[backdrop-filter]:bg-gray-50/60">
      <div className="container-max py-3 flex items-center justify-between">
        <button
          className={`md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border ${colors.bg.primary} ${colors.hover.light}`}
          onClick={onMenuClick}
          aria-label="Open Menu"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

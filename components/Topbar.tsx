"use client";
import React from 'react';

export type TopbarProps = {
  onMenuClick: () => void;
};

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <div className="sticky top-0 z-30 bg-gray-50/80 backdrop-blur supports-[backdrop-filter]:bg-gray-50/60">
      <div className="container-max py-3 flex items-center justify-between">
        <button
          className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border bg-white hover:bg-gray-50"
          onClick={onMenuClick}
          aria-label="Open Menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <div className="ml-auto flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium">Admin Sales</div>
            <div className="text-xs text-gray-500">admin.sales@proplens.com</div>
          </div>
          <div className="h-9 w-9 rounded-full bg-gray-900 text-white grid place-items-center text-sm">A</div>
        </div>
      </div>
    </div>
  );
}

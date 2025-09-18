"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { FolderOpenIcon, LogOutIcon } from './icons';
import { colors } from '../styles/colors';
import React from 'react';
import type { Route } from 'next';

export type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const nav = [
  { href: '/projects', label: 'Our projects' },
  { href: '/sop', label: 'SOP & Policies' },
] satisfies Array<{ href: Route; label: string }>;

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={clsx(
          `fixed z-50 inset-y-0 left-0 w-64 ${colors.bg.primary} border-r ${colors.border.light} flex flex-col`,
          'transition-transform duration-200 md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
     >
        <div className={`px-5 py-6 border-b ${colors.border.light}`}>
          <div className={`text-base font-semibold flex items-center gap-2 ${colors.text.primary}`}>
            {/* Title icon: folder-open with dark background */}
            <span className={`inline-flex h-6 w-6 items-center justify-center rounded-md ${colors.bg.dark}`}>
              <FolderOpenIcon className={`w-4 h-4 ${colors.text.white}`} />
            </span>
            <span>Sales Admin Panel</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`nav-${item.label}`}
                className={clsx(
                  'flex items-center gap-2 px-4 py-2 rounded-2xl text-sm',
                  active ? `${colors.bg.tertiary} ${colors.text.primary}` : `${colors.text.secondary} ${colors.hover.light} ${colors.hover.text}`
                )}
                onClick={onClose}
              >
                {/* Item icons */}
                <FolderOpenIcon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className={`mt-auto p-4 border-t ${colors.border.light}`}>
          <button className={`w-full flex items-center gap-2 text-left px-4 py-2 text-sm ${colors.text.secondary} ${colors.hover.light} rounded-lg`}>
            <LogOutIcon className="w-4 h-4" />
            Log out
          </button>
        </div>
        <div className={`p-4 border-t ${colors.border.light}`}>
          <div className="flex items-center gap-3">
            <div className={`h-8 w-8 rounded-full ${colors.bg.dark} ${colors.text.white} grid place-items-center text-sm`}>A</div>
            <div>
              <div className={`text-sm font-medium ${colors.text.primary}`}>Admin Sales</div>
              <div className={`text-xs ${colors.text.tertiary}`}>admin.sales@proplens.com</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

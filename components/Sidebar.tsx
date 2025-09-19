"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { FolderOpenIcon, LogOutIcon, FileTextIcon } from './icons';
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
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={clsx(
          `fixed z-50 inset-y-0 left-0 w-64 ${colors.bg.secondary} border-r ${colors.border.light} flex flex-col`,
          'transition-transform duration-200 md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
     >
        <div className={`px-5 py-6 border-b ${colors.border.light}`}>
          <div className={`text-base font-semibold flex items-center gap-2 ${colors.text.primary}`}>
            <span className={`inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-white`}>
              <FolderOpenIcon className="w-4 h-4 text-white" style={{ color: 'white' }} />
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
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 hover:text-gray-900`,
                  active ? `bg-gray-200 text-gray-900` : `text-gray-500`
                )}
                onClick={onClose}
              >
                {item.href === '/sop' ? (
                  <FileTextIcon className="w-4 h-4" />
                ) : (
                  <FolderOpenIcon className="w-4 h-4" />
                )}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className={`mt-auto p-4`}>
          <button className={`w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-900 rounded-lg`}>
            <LogOutIcon className="w-4 h-4" />
            Log out
          </button>
        </div>
        <div className={`p-4 border-t ${colors.border.light}`}>
          <div className="flex items-center gap-3">
            <div className={`h-8 w-8 rounded-full bg-gray-900 text-white grid place-items-center text-sm font-medium`} style={{ backgroundColor: '#111827', color: 'white' }}>A</div>
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

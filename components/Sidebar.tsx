"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import React from 'react';

export type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const nav = [
  { href: '/projects', label: 'Our projects' },
  { href: '/sop', label: 'SOP & Policies' },
];

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
          'fixed z-50 inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col',
          'transition-transform duration-200 md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="px-5 py-4 border-b">
          <div className="font-semibold">Sales Admin Panel</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`nav-${item.label}`}
                className={clsx(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
                onClick={onClose}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto p-3 border-t">
          <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
            Log out
          </button>
        </div>
        <div className="p-3 border-t">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-900 text-white grid place-items-center text-sm">A</div>
            <div>
              <div className="text-sm font-medium">Admin Sales</div>
              <div className="text-xs text-gray-500">admin.sales@proplens.com</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

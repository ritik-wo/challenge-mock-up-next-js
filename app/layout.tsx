"use client";
import React, { useState } from 'react';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import clsx from 'clsx';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex bg-gray-50">
          {/* Sidebar */}
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Content */}
          <div className={clsx('flex-1 min-w-0', 'md:ml-64')}> {/* reserve space for desktop sidebar */}
            <Topbar onMenuClick={() => setSidebarOpen(true)} />
            <main className="container-max py-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
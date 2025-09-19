"use client";
import React, { useState } from 'react';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { colors } from '../styles/colors';
import clsx from 'clsx';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <html lang="en">
      <body>
        <div className={`min-h-screen flex ${colors.bg.secondary}`}>
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className={clsx('flex-1 min-w-0', 'md:ml-64')}> 
            <Topbar onMenuClick={() => setSidebarOpen(true)} />
            <main className="container-max py-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
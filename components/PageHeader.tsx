"use client";
import React from 'react';

export type PageHeaderProps = {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  className?: string;
  id?: string;
};

export function PageHeader({ title, subtitle, rightSlot, id }: PageHeaderProps) {
  if (rightSlot) {
    return (
      <div className="flex items-start justify-between">
        <div>
          <h1 id={id} className="text-xl sm:text-xl font-semibold">{title}</h1>
          {subtitle ? (
            <p className="mt-1 text-base text-gray-500">{subtitle}</p>
          ) : null}
        </div>
        {rightSlot}
      </div>
    );
  }

  return (
    <div>
      <h1 id={id} className="text-lg sm:text-xl font-semibold">{title}</h1>
      {subtitle ? (
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      ) : null}
    </div>
  );
}

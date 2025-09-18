"use client";
import React from 'react';
import { colors } from '../styles/colors';

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
      <div className="flex justify-between sm:items-start items-center sm:gap-0 gap-2">
        <div className="min-w-0">
          <h1 id={id} className="text-xl sm:text-xl font-semibold">{title}</h1>
          {subtitle ? (
            <p className={`mt-1 text-base ${colors.text.tertiary}`}>{subtitle}</p>
          ) : null}
        </div>
        <div className="shrink-0 sm:ml-0 ml-2">
          {rightSlot}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 id={id} className="text-lg sm:text-xl font-semibold">{title}</h1>
      {subtitle ? (
        <p className={`mt-1 text-sm ${colors.text.tertiary}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}

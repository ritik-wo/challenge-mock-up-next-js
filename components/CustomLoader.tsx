"use client";
import React from 'react';
import { colors } from '../styles/colors';

export type CustomLoaderProps = {
  title: string;
  subtitle: string;
  outerBgClass?: string;
  borderClass?: string;
  topBorderClass?: string;
};

export function CustomLoader({
  title,
  subtitle,
  outerBgClass = colors.bg.tertiary,
  borderClass = 'border-gray-300',
  topBorderClass = 'border-t-gray-900',
}: CustomLoaderProps) {
  return (
    <div className="text-center py-12">
      <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${outerBgClass} flex items-center justify-center`}>
        <div className={`animate-spin rounded-full h-10 w-10 border-4 ${borderClass} ${topBorderClass}`}></div>
      </div>
      <h3 className={`text-lg font-medium ${colors.text.primary} mb-2`}>{title}</h3>
      <p className={colors.text.tertiary}>{subtitle}</p>
    </div>
  );
}

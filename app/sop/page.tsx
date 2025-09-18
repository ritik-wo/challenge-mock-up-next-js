"use client";
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { DocumentSection } from '@/components/DocumentSection';
import { FileTextIcon, UsersIcon, UserPlusIcon } from '@/components/icons';
import type { Document } from '@/components/DocumentCard';

// Configuration for all SOP sections with static documents
const sopSections = [
  {
    id: 'sales-sops',
    title: 'Sales SOPs',
    description: 'Standard operating procedures for sales processes and customer interactions',
    icon: <FileTextIcon className="w-5 h-5 text-blue-600" />,
    iconBgColor: 'bg-blue-50',
    currentSectionTitle: 'Current Sales SOPs',
    staticDocuments: [
      {
        id: 'sales-1',
        name: 'Sales Process Manual v2.1',
        uploadDate: '2025-08-15',
        fileSize: '2.5 MB',
        category: 'Sales SOPs'
      },
      {
        id: 'sales-2',
        name: 'Customer Interaction Guidelines',
        uploadDate: '2025-08-15',
        fileSize: '1.8 MB',
        category: 'Sales SOPs'
      }
    ]
  },
  {
    id: 'kyc-guidelines',
    title: 'Customer KYC/Document Upload Guidelines',
    description: 'Guidelines for customer verification and document collection processes',
    icon: <UsersIcon className="w-5 h-5 text-green-600" />,
    iconBgColor: 'bg-green-50',
    currentSectionTitle: 'Current KYC Guidelines',
    staticDocuments: [
      {
        id: 'kyc-1',
        name: 'KYC Document Checklist',
        uploadDate: '2025-08-15',
        fileSize: '1.2 MB',
        category: 'KYC Guidelines'
      }
    ]
  },
  {
    id: 'broker-registration',
    title: 'New Broker Registration Process',
    description: 'Procedures and requirements for onboarding new brokers to the platform',
    icon: <UserPlusIcon className="w-5 h-5 text-purple-600" />,
    iconBgColor: 'bg-purple-50',
    currentSectionTitle: 'Current Registration Processes',
    staticDocuments: [
      {
        id: 'broker-1',
        name: 'Broker Onboarding Process',
        uploadDate: '2025-08-15',
        fileSize: '3.1 MB',
        category: 'Registration Processes'
      }
    ]
  }
];

export default function SopPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const loadData = async () => {
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6 -mt-4">
        {/* Header */}
        <div>
          <h1 className="text-lg sm:text-xl font-semibold">SOP & Policies Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage standard operating procedures, policies, and guidelines for your organization</p>
        </div>

        {/* Loading State */}
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Loading documents...</h3>
          <p className="text-gray-500">Please wait while we fetch your documents</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 -mt-4">
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-semibold">SOP & Policies Management</h1>
        <p className="mt-1 text-sm text-gray-500">Manage standard operating procedures, policies, and guidelines for your organization</p>
      </div>

      {/* Document Sections */}
      <div className="space-y-8">
        {sopSections.map((section) => (
          <DocumentSection
            key={section.id}
            title={section.title}
            description={section.description}
            icon={section.icon}
            iconBgColor={section.iconBgColor}
            currentSectionTitle={section.currentSectionTitle}
            staticDocuments={section.staticDocuments}
          />
        ))}
      </div>

      <Toaster position="top-right" />
    </div>
  );
}

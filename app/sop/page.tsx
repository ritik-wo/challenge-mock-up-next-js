"use client";
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { DocumentSection } from '@/components/DocumentSection';
import { PageHeader } from '@/components/PageHeader';
import { FileTextIcon, UsersIcon, UserPlusIcon } from '@/components/icons';
import type { Document } from '@/components/DocumentCard';
import { colors } from '../../styles/colors';

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

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="SOP & Policies Management"
          subtitle="Manage standard operating procedures, policies, and guidelines for your organization"
        />
        <div className="text-center py-12">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${colors.bg.tertiary} flex items-center justify-center`}>
            <div className={`animate-spin rounded-full h-10 w-10 border-4 border-gray-300 ${colors.text.quaternary.replace('text-', 'border-t-')}`}></div>
          </div>
          <h3 className={`text-lg font-medium ${colors.text.primary} mb-2`}>Loading documents...</h3>
          <p className={colors.text.tertiary}>Please wait while we fetch your documents</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="SOP & Policies Management"
        subtitle="Manage standard operating procedures, policies, and guidelines for your organization"
      />

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

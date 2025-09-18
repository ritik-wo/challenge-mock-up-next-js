"use client";
import React from 'react';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import { FileIcon, LinkIcon, VideoIcon, MapPinIcon, PlusIcon, UploadIcon } from './icons';
import { FileUploadCustom } from './FileUploadCustom';
import { colors } from '../styles/colors';

export type NewProjectFormProps = {
  onCancel?: () => void;
  onSave?: (values: any) => void;
};

type FormValues = {
  name: string;
  projectUrl: string;
  coordinates: string;
  videos: { url: string; description: string }[];
  documents: {
    brochure: File[];
    floorPlan: File[];
    spa: File[];
    others: File[];
  };
};

export function NewProjectForm({ onCancel, onSave }: NewProjectFormProps) {
  const { control, register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: '',
      projectUrl: '',
      coordinates: '',
      videos: [
        { url: '', description: '' },
      ],
      documents: {
        brochure: [],
        floorPlan: [],
        spa: [],
        others: [],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'videos' });
  const watchedUrl = useWatch({ control, name: 'projectUrl' });

  const isValidUrl = (value: string) => {
    try {
      const u = new URL(value);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const persistToLocalStorage = (vals: FormValues) => {
    try {
      const key = 'projects';
      const existing = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      const arr = existing ? JSON.parse(existing) : [];
      arr.push(vals);
      window.localStorage.setItem(key, JSON.stringify(arr));
    } catch (e) {
      console.error('Failed to persist project to localStorage', e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((vals: FormValues) => {
        persistToLocalStorage(vals);
        onSave?.(vals);
      })}
      className="card p-4 space-y-4"
      data-testid="new-project-form"
    >
      <div className="mb-4">
        <h2 className={`text-sm ${colors.text.primary}`}>Add New Project</h2>
      </div>
      <div>
        <label htmlFor="project-name" className={`text-sm font-medium mb-2 block ${colors.text.primary}`}>
          Project Name *
        </label>
        <input
          id="project-name"
          className="w-[40%] rounded-md border border-gray-200 bg-gray-100 text-gray-700 px-2 py-1.5 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400"
          placeholder="Enter project name"
          {...register('name', { required: 'Project name is required', setValueAs: (v) => (typeof v === 'string' ? v.trim() : v) })}
          aria-invalid={!!errors.name}
        />
        {errors.name?.message && (
          <span className="mt-1 block text-xs text-red-600" aria-live="polite">{errors.name.message}</span>
        )}
      </div>

      <div className="border-t my-2" />
      <div className="space-y-3">
        <div className="text-sm font-medium">Project Documents</div>
        <div>
          <div className="text-sm font-medium mb-2 flex items-center gap-2">
            <FileIcon className="w-4 h-4 text-gray-500" /> Brochure
          </div>
          <Controller
            control={control}
            name={'documents.brochure'}
            render={({ field }: { field: { value: File[]; onChange: (v: File[]) => void } }) => (
              <FileUploadCustom multiple={false} onFilesSelected={(fl) => field.onChange(Array.from(fl))} />
            )}
          />
        </div>
        <div>
          <div className="text-sm font-medium mb-2 flex items-center gap-2">
            <FileIcon className="w-4 h-4 text-gray-500" /> Floor Plan set
          </div>
          <Controller
            control={control}
            name={'documents.floorPlan'}
            render={({ field }: { field: { value: File[]; onChange: (v: File[]) => void } }) => (
              <FileUploadCustom multiple={false} onFilesSelected={(fl) => field.onChange(Array.from(fl))} />
            )}
          />
        </div>
      </div>
      <div>
        <label htmlFor="project-url" className="text-sm font-medium mb-2 flex items-center gap-2">
          <LinkIcon className="w-4 h-4 text-gray-500" /> Project URL *
        </label>
        <div className="flex items-center gap-2">
          <input
            id="project-url"
            className="w-[40%] rounded-md border border-gray-200 bg-gray-100 text-gray-700 px-2 py-1.5 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400"
            placeholder="https://example.com/project"
            {...register('projectUrl', {
              required: 'Project URL is required',
              validate: (v) => (isValidUrl(v) ? true : 'Please enter a valid url'),
            })}
            aria-invalid={!!errors.projectUrl}
          />
          <button
            type="button"
            disabled={!isValidUrl(watchedUrl || '')}
            onClick={() => {
              if (isValidUrl(watchedUrl || '')) window.open(watchedUrl, '_blank', 'noopener');
            }}
            className="inline-flex items-center gap-2 rounded-md border border-gray-00 bg-white h-8 px-3 text-sm font-semibold hover:bg-gray-50 shadow-sm"
          >
            <LinkIcon className="w-4 h-4" />
            Open
          </button>
        </div>
        {errors.projectUrl?.message && (
          <span className="mt-1 block text-xs text-red-600" aria-live="polite">{errors.projectUrl.message}</span>
        )}
      </div>
      <div className="space-y-3">
        <div className="text-sm font-medium flex items-center gap-2">
          <VideoIcon className="w-4 h-4 text-gray-500" /> Project Video Links
        </div>
        {fields.map((field, idx: number) => (
          <div key={field.id} className="rounded-lg border p-3 space-y-2 relative">
            {fields.length > 1 && (
              <button
                type="button"
                aria-label="Remove video link"
                className="absolute right-2 top-2 h-6 w-6 rounded-md border text-xs text-gray-600 hover:bg-gray-100"
                onClick={() => remove(idx)}
              >
                ×
              </button>
            )}
            <div>
              <label htmlFor={`videos.${idx}.url`} className="text-sm font-medium mb-1 inline-block">Video URL</label>
              <input
                id={`videos.${idx}.url`}
                className="w-full rounded-md border border-gray-200 bg-gray-100 text-gray-700 px-3 py-2 placeholder:text-sm"
                placeholder="https://youtube.com/watch?v=..."
                {...register(`videos.${idx}.url` as const, {
                  validate: (v) => (!v || isValidUrl(v) ? true : 'Enter a valid URL'),
                })}
              />
            </div>
            <div>
              <label htmlFor={`videos.${idx}.description`} className="text-sm font-medium mb-1 inline-block">Video description</label>
              <input
                id={`videos.${idx}.description`}
                className="w-full rounded-md border border-gray-200 bg-gray-100 text-gray-700 px-3 py-2 placeholder:text-sm"
                placeholder="e.g., Project Overview, Virtual Tour, Amenities..."
                {...register(`videos.${idx}.description` as const, { maxLength: 120 })}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border bg-white h-8 px-3 text-sm text-gray-900 hover:bg-gray-50"
          onClick={() => append({ url: '', description: '' })}
        >
          <PlusIcon className="w-4 h-4" />
          Add more links
        </button>
      </div>
      <div>
        <label htmlFor="coordinates" className="text-sm font-medium mb-2 flex items-center gap-2">
          <MapPinIcon className="w-4 h-4 text-gray-500" /> Location coordinates (Lat/Long) *
        </label>
        <input
          id="coordinates"
          className="w-[40%] rounded-md border border-gray-200 bg-gray-100 text-gray-700 px-3 py-2 placeholder:text-gray-400"
          placeholder="e.g., 19.0760, 72.8777"
          {...register('coordinates', {
            required: 'Location coordinates are required',
            validate: (v) => {
              if (!v || !v.trim()) return true;
              const m = v.match(/^\s*(-?\d{1,2}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)\s*$/);
              if (!m) return 'Enter as "lat, long"';
              const lat = parseFloat(m[1]);
              const lng = parseFloat(m[2]);
              if (lat < -90 || lat > 90) return 'Latitude must be between -90 and 90';
              if (lng < -180 || lng > 180) return 'Longitude must be between -180 and 180';
              return true;
            },
          })}
          aria-invalid={!!errors.coordinates}
        />
        {errors.coordinates?.message && (
          <span className="mt-1 block text-xs text-red-600" aria-live="polite">{errors.coordinates.message}</span>
        )}
      </div>
      <div className="space-y-3">
        <div>
          <div className="text-sm font-medium mb-2 flex items-center gap-2">
            <FileIcon className="w-4 h-4 text-gray-500" /> SPA (Sales Purchase Agreement)
          </div>
          <Controller
            control={control}
            name={'documents.spa'}
            render={({ field }: { field: { value: File[]; onChange: (v: File[]) => void } }) => (
              <FileUploadCustom multiple={false} onFilesSelected={(fl) => field.onChange(Array.from(fl))} />
            )}
          />
        </div>
        <div>
          <div className="text-sm font-medium mb-2 flex items-center gap-2">
            <FileIcon className="w-4 h-4 text-gray-500" /> Other Project Documents
          </div>
          <Controller
            control={control}
            name={'documents.others'}
            render={({ field }: { field: { value: File[]; onChange: (v: File[]) => void } }) => (
              <FileUploadCustom multiple={false} onFilesSelected={(fl) => field.onChange(Array.from(fl))} />
            )}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 pt-2">
        <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-black text-white h-9 px-4 text-sm hover:bg-black/90">
          <UploadIcon className="w-4 h-4" />
          Save Project
        </button>
        <button type="button" className="inline-flex items-center gap-2 rounded-md border h-9 px-4 text-sm hover:bg-gray-50" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

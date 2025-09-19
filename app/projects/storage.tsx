import type { Project } from '../../components/ProjectDetailModal';

export const PROJECTS_STORAGE_KEY = 'proplens-projects';

export const DEFAULT_PROJECTS: Project[] = [
  {
    title: 'Skyline Towers',
    url: 'https://skylinetowers.com',
    videos: [
      { label: 'Project Overview Video', url: 'https://youtube.com/watch?v=sample1' },
      { label: 'Virtual Tour', url: 'https://vimeo.com/sample2' }
    ],
    coordinates: '19.076, 72.8777',
    documents: [
      { name: 'Skyline_Towers_Brochure.pdf', type: 'PDF Document' }
    ],
    createdAt: '2025-08-15'
  },
  {
    title: 'Garden Residency',
    url: 'https://gardenresidency.com',
    videos: [
      { label: 'Amenities Showcase', url: 'https://youtube.com/watch?v=sample3' }
    ],
    coordinates: '19.1136, 72.8697',
    documents: [
      { name: 'Garden_Residency_Brochure.pdf', type: 'PDF Document' }
    ],
    createdAt: '2025-08-15'
  }
];

export const projectsAPI = {
  getAll: (): Project[] => {
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      const userProjects = stored ? JSON.parse(stored) : [];

      const filteredUserProjects = userProjects.filter((userProject: Project) =>
        !DEFAULT_PROJECTS.some((defaultProject) => defaultProject.title === userProject.title)
      );

      return [...DEFAULT_PROJECTS, ...filteredUserProjects];
    } catch (error) {
      console.error('Error fetching projects from localStorage:', error);
      return DEFAULT_PROJECTS;
    }
  },

  save: (project: any): Project => {
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      const userProjects = stored ? JSON.parse(stored) : [];

      const newProject: Project = {
        ...project,
        createdAt: new Date().toISOString().split('T')[0],
      };

      userProjects.push(newProject);
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(userProjects));
      return newProject;
    } catch (error) {
      console.error('Error saving project to localStorage:', error);
      throw error;
    }
  },

  delete: (title: string): void => {    
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      const userProjects = stored ? JSON.parse(stored) : [];

      const filteredUserProjects = userProjects.filter((p: Project) => p.title !== title);
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(filteredUserProjects));
    } catch (error) {
      console.error('Error deleting project from localStorage:', error);
      throw error;
    }
  },
};

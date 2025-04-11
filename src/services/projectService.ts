
import { Project } from "@/types";
import { mockProjects } from "@/data/mockData";

// These functions will be replaced with actual API calls later
export const getProjects = (): Promise<Project[]> => {
  return Promise.resolve(mockProjects);
};

export const getProjectById = (id: number): Promise<Project | undefined> => {
  return Promise.resolve(mockProjects.find(project => project.id === id));
};

export const createProject = (project: Omit<Project, "id">): Promise<Project> => {
  const newProject = {
    ...project,
    id: Math.max(...mockProjects.map(p => p.id), 0) + 1
  };
  mockProjects.push(newProject);
  return Promise.resolve(newProject);
};

export const updateProject = (project: Project): Promise<Project> => {
  const index = mockProjects.findIndex(p => p.id === project.id);
  if (index !== -1) {
    mockProjects[index] = project;
  }
  return Promise.resolve(project);
};

export const deleteProject = (id: number): Promise<boolean> => {
  const index = mockProjects.findIndex(p => p.id === id);
  if (index !== -1) {
    mockProjects.splice(index, 1);
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
};

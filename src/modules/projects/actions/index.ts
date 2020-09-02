import { Project } from '../types';

export enum ProjectActions {
  ADD_PROJECT = 'PROJECTS/ADD_PROJECT',
  UPDATE_PROJECT = 'PROJECTS/UPDATE_PROJECT',
  REMOVE_PROJECT = 'PROJECTS/REMOVE_PROJECT',
  ASSIGN_EMPLOYEE = 'PROJECTS/ASSIGN_EMPLOYEE',
  REMOVE_EMPLOYEE = 'PROJECTS/REMOVE_EMPLOYEE',
}

type AddProject = {
  type: ProjectActions.ADD_PROJECT,
  payload: {
    project: Project,
  }
}

type UpdateProject = {
  type: ProjectActions.UPDATE_PROJECT,
  payload: {
    project: Project
  }
}

type RemoveProject = {
  type: ProjectActions.REMOVE_PROJECT,
  payload: {
    projectId: string
  }
}

type AssignEmployee = {
  type: ProjectActions.ASSIGN_EMPLOYEE,
  payload: {
    project: Project
  }
}

type RemoveEmployee = {
  type: ProjectActions.REMOVE_EMPLOYEE,
  payload: {
    project: Project,
  }
}

// action creators
export const addProject = (project: Project): AddProject => ({
  type: ProjectActions.ADD_PROJECT,
  payload: { project },
});

export const updateProject = (project: Project): UpdateProject => ({
  type: ProjectActions.UPDATE_PROJECT,
  payload: { project },
});

export const removeProject = (projectId: string): RemoveProject => ({
  type: ProjectActions.REMOVE_PROJECT,
  payload: { projectId },
});

export const assignEmployee = (project: Project): AssignEmployee => ({
  type: ProjectActions.ASSIGN_EMPLOYEE,
  payload: { project },
});

export const removeEmployeeFromProject = (project: Project): RemoveEmployee => ({
  type: ProjectActions.REMOVE_EMPLOYEE,
  payload: { project },
});

export type ProjectActionTypes = AddProject | RemoveProject | UpdateProject
| AssignEmployee | RemoveEmployee

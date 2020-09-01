import { Project } from '../types';

export enum ProjectActions {
  ADD_PROJECT = 'PROJECTS/ADD_PROJECT',
  UPDATE_PROJECT = 'PROJECTS/UPDATE_PROJECT',
  REMOVE_PROJECT = 'PROJECTS/REMOVE_PROJECT',
  ASSIGN_EMPLOYEE = 'PROJECTS/ASSIGN_EMPLOYEE',
  REMOVE_EMPLOYEE = 'PROJECTS/REMOVE_EMPLOYEE',
}

type ActionAddProject = {
  type: ProjectActions.ADD_PROJECT,
  payload: {
    project: Project,
  }
}

type ActionUpdateProject = {
  type: ProjectActions.UPDATE_PROJECT,
  payload: {
    project: Project
  }
}

type ActionRemoveProject = {
  type: ProjectActions.REMOVE_PROJECT,
  payload: {
    projectId: string
  }
}

type ActionAssignEmployee = {
  type: ProjectActions.ASSIGN_EMPLOYEE,
  payload: {
    project: Project
  }
}

type ActionRemoveEmployee = {
  type: ProjectActions.REMOVE_EMPLOYEE,
  payload: {
    project: Project,
  }
}

// action creators
export const addProject = (project: Project): ActionAddProject => ({
  type: ProjectActions.ADD_PROJECT,
  payload: { project },
});

export const updateProject = (project: Project): ActionUpdateProject => ({
  type: ProjectActions.UPDATE_PROJECT,
  payload: { project },
});

export const removeProject = (projectId: string): ActionRemoveProject => ({
  type: ProjectActions.REMOVE_PROJECT,
  payload: { projectId },
});

export const assignEmployee = (project: Project): ActionAssignEmployee => ({
  type: ProjectActions.ASSIGN_EMPLOYEE,
  payload: { project },
});

export const removeEmployeeFromProject = (project: Project): ActionRemoveEmployee => ({
  type: ProjectActions.REMOVE_EMPLOYEE,
  payload: { project },
});

export type ProjectActionTypes =
  ActionAddProject |
  ActionRemoveProject |
  ActionUpdateProject |
  ActionAssignEmployee |
  ActionRemoveEmployee

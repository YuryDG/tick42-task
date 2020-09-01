/* eslint-disable max-len */
import { ProjectIndexed } from '../types';
import { CompanyActions, CompanyActionTypes } from '../../companies/actions';
import { ProjectActionTypes, ProjectActions } from '../actions';

type Actions = CompanyActionTypes | ProjectActionTypes

const projectsReducer = (state: ProjectIndexed = {}, action: Actions): ProjectIndexed => {
  switch (action.type) {
    case CompanyActions.COMPANY_LOADED: {
      const { projects } = action.payload;
      const newProjectIndexed = projects.reduce<ProjectIndexed>((indexed, item) => {
        // eslint-disable-next-line no-param-reassign
        indexed[item.id] = item;
        return indexed;
      }, {});

      return { ...state, ...newProjectIndexed };
    }
    case ProjectActions.ASSIGN_EMPLOYEE:
    case ProjectActions.REMOVE_EMPLOYEE:
    case ProjectActions.ADD_PROJECT:
    case ProjectActions.UPDATE_PROJECT: {
      const { project } = action.payload;
      return { ...state, [project.id]: { ...project } };
    }
    case ProjectActions.REMOVE_PROJECT: {
      const { projectId } = action.payload;
      const newState = { ...state };
      delete newState[projectId];
      return newState;
    }
    default:
      return state;
  }
};

export default projectsReducer;

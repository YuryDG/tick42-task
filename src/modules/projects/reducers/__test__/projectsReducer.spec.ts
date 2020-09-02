import { projectsIndexed } from '../../../../test-data';
import projectsReducer from '../projectsReducer';
import { assignEmployee, removeEmployeeFromProject, removeProject } from '../../actions';
import { loadCompanies, companyLoaded } from '../../../companies/actions';

const testProject = {
  id: '2',
  name: 'Sleek Concrete Shoes',
  department: 'Kids',
  employees: ['1'],
  companyId: '2',
};

describe('projects/reducer', () => {
  it('should return the same state', () => {
    const prevState = projectsIndexed;

    const action = loadCompanies();
    const newSate = projectsReducer(prevState, action);
    expect(newSate).toStrictEqual(prevState);
  });

  it('should add new projects when load a company', () => {
    const prevState = {};
    const currentProject = { ...testProject };
    const expectedState = {
      [currentProject.id]: currentProject,
    };

    const action = companyLoaded(null, [currentProject]);
    const newSate = projectsReducer(prevState, action);
    expect(newSate).toStrictEqual(expectedState);
  });

  it('should assign employee to the project', () => {
    const prevState = projectsIndexed;

    const currentProject = { ...testProject };
    const expectedState = {
      ...projectsIndexed,
      [currentProject.id]: currentProject,
    };

    const action = assignEmployee(currentProject);
    const newSate = projectsReducer(prevState, action);
    expect(newSate).toStrictEqual(expectedState);
  });

  it('should remove employee to the project', () => {
    const prevState = projectsIndexed;

    const currentProject = { ...testProject };
    currentProject.employees = [];

    const expectedState = {
      ...projectsIndexed,
      [currentProject.id]: currentProject,
    };

    const action = removeEmployeeFromProject(currentProject);

    const newSate = projectsReducer(prevState, action);

    expect(newSate).toStrictEqual(expectedState);
  });

  it('should remove project', () => {
    const prevState = projectsIndexed;
    const currentProject = projectsIndexed['1'];
    const expectedState = { ...projectsIndexed };
    delete expectedState[currentProject.id];

    const action = removeProject(currentProject.id);

    const newSate = projectsReducer(prevState, action);

    expect(newSate).toStrictEqual(expectedState);
  });
});

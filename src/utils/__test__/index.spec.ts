import { companies, employees, projects } from '../../test-data';
import { getEmployeesFromCompany, getProjectsFromCompany, getEmployeesJobArea } from '..';

describe('utils', () => {
  it('function getEmployeesFromCompany', () => {
    const company = companies[0];
    const expectedIdEmployees = ['1', '2'];
    const result = getEmployeesFromCompany(company, employees);
    const ids = result.map((emp) => emp.id);
    expect(ids).toStrictEqual(expectedIdEmployees);
  });

  it('function getProjectsFromCompany', () => {
    const company = companies[0];
    const expectedIdProjects = ['1'];
    const result = getProjectsFromCompany(company, projects);
    const ids = result.map((emp) => emp.id);
    expect(ids).toStrictEqual(expectedIdProjects);
  });

  it('function getEmployeesJobArea', () => {
    const expectResult = ['Web', 'Implementation', 'Metrics'];
    const result = getEmployeesJobArea(employees);
    expect(result).toStrictEqual(expectResult);
  });
});

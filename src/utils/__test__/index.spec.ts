import {
  companies, employees, projects, addresses, addressesIndexed,
} from '../../test-data';
import {
  getEmployeesFromCompany,
  getProjectsFromCompany,
  getEmployeesJobArea,
  getAddressFromCompany,
  buildTreeData,
} from '..';

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

  it('function getAddressFromCompany', () => {
    const expectedAddress = addresses[0];
    const company = companies[0];

    const result = getAddressFromCompany(company, addressesIndexed);
    expect(result).toStrictEqual(expectedAddress);
  });

  it('function buildTreeData', () => {
    const expectedTreeData = {
      items: [
        {
          company: {
            business: 'world-class streamline supply-chains',
            id: '1',
            name: 'Hackett - Greenfelder',
            slogan: 'Profit-focused holistic info-mediaries',
          },
          jobAreas: [
            {
              areaId: 'Web*1',
              name: 'Web',
              employees: [
                {
                  companyId: '1',
                  dateOfBirth: '1965-01-10T20:48:37.953Z',
                  firstName: 'Fanny',
                  id: '1',
                  jobArea: 'Web',
                  jobTitle: 'District Web Technician',
                  jobType: 'Manager',
                  lastName: 'Crona',
                },
              ],
            },
          ],
        },
      ],
    };

    const myCompanies = {
      1: companies[0],
    };

    const myEmployees = {
      1: employees[0],
    };

    const result = buildTreeData(myCompanies, myEmployees);
    expect(result).toStrictEqual(expectedTreeData);
  });
});

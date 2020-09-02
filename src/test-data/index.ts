import { Company } from '../modules/companies/types';
import { Address } from '../modules/addresses/types';
import { Project } from '../modules/projects/types';
import { Employee } from '../modules/employees/types';

const companies: Company[] = [
  {
    id: '1',
    name: 'Hackett - Greenfelder',
    business: 'world-class streamline supply-chains',
    slogan: 'Profit-focused holistic info-mediaries',
  },
  {
    id: '2',
    name: 'Hagenes, Lesch and Kling',
    business: 'distributed facilitate deliverables',
    slogan: 'Reduced 5th generation service-desk',
  },
];

const addresses: Address[] = [
  {
    id: '1',
    city: 'South Edna',
    country: 'Rwanda',
    street: '441 Rudy Falls',
    state: 'Arizona',
    companyId: '1',
  },
];

const projects: Project[] = [
  {
    id: '1',
    name: 'Unbranded Frozen Car',
    department: 'Garden',
    employees: ['1', '2'],
    companyId: '1',
  },
  {
    id: '2',
    name: 'Sleek Concrete Shoes',
    department: 'Kids',
    employees: [],
    companyId: '2',
  },
];

const employees: Employee[] = [
  {
    id: '1',
    firstName: 'Fanny',
    lastName: 'Crona',
    dateOfBirth: '1965-01-10T20:48:37.953Z',
    companyId: '1',
    jobTitle: 'District Web Technician',
    jobArea: 'Web',
    jobType: 'Manager',
  },
  {
    id: '2',
    firstName: 'Brandy',
    lastName: 'Cormier',
    dateOfBirth: '1969-06-26T20:59:44.615Z',
    companyId: '1',
    jobTitle: 'Investor Assurance Strategist',
    jobArea: 'Implementation',
    jobType: 'Analyst',
  },
  {
    id: '3',
    firstName: 'Lenna',
    lastName: 'Gutmann',
    dateOfBirth: '1962-06-10T06:29:27.705Z',
    companyId: '2',
    jobTitle: 'Forward Data Strategist',
    jobArea: 'Metrics',
    jobType: 'Technician',
  },
];

export {
  companies, addresses, projects, employees,
};

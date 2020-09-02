/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */

import { Project } from '../modules/projects/types';
import { Company, CompanyIndexed } from '../modules/companies/types';
import { Employee, EmployeeIndexed } from '../modules/employees/types';
import { TreeDataItem, JobArea, TreeData } from '../modules/app/types';
import { AddressIndexed } from '../modules/addresses/types';

function getEmployeesFromCompany(company: Company, employees: Employee[]): Employee[] {
  return employees.filter((employee) => employee.companyId === company.id);
}

function getProjectsFromCompany(company: Company, projects: Project[]): Project[] {
  return projects.filter((item) => company.id === item.companyId);
}

function getEmployeesJobArea(employees: Employee[]): string[] {
  const areas = employees.map((employee) => employee.jobArea);
  const uniquesJobAreas = new Set(areas);
  return Array.from(uniquesJobAreas);
}

// eslint-disable-next-line max-len
function createTreeDataItem(company: Company, employees: Employee[], areas: string[]): TreeDataItem {
  const jobAreas: JobArea[] = [];
  for (const area of areas) {
    jobAreas.push({
      areaId: `${area}*${company.id}`,
      name: area,
      employees: employees.filter((employee) => employee.jobArea === area),
    });
  }
  const treeDataItem: TreeDataItem = { company, jobAreas };
  return treeDataItem;
}

function buildTreeData(companies: CompanyIndexed, employees: EmployeeIndexed):TreeData {
  const treeData: TreeData = {
    items: [],
  };

  for (const company of Object.values(companies)) {
    const employeesByCompany = getEmployeesFromCompany(company, Object.values(employees));
    const areas = getEmployeesJobArea(employeesByCompany);
    const treeDataItem = createTreeDataItem(company, employeesByCompany, areas);
    treeData.items.push(treeDataItem);
  }
  return treeData;
}

function getAddressFromCompany(company: Company, addresses: AddressIndexed) {
  const arrAddresses = Object.values(addresses);
  return arrAddresses.find((address) => address.companyId === company.id);
}

export {
  getEmployeesFromCompany,
  getProjectsFromCompany,
  buildTreeData,
  getEmployeesJobArea,
  getAddressFromCompany,
};

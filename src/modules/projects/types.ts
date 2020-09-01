import { Employee } from '../employees/types';

export type Project = {
  id: string;
  name: string;
  department: string;
  employees: string[];
  companyId: string;
}

export type ProjectDataTable = Project & { employeesList: Employee[]}

export type ProjectIndexed = Record<string, Project>

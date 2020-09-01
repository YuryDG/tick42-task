import { Employee } from '../employees/types';
import { Company } from '../companies/types';

export type JobArea = {
  areaId: string, // name*companyId
  name: string,
  employees: Employee[]
}

export type TreeDataItem = {
  company: Company,
  jobAreas: JobArea[]
}

export type TreeData = {
  items: TreeDataItem[]
}

export type NodeType = 'None' | 'Company' | 'JobArea' | 'Employee'

export type SelectedItem = {
  currentNode: NodeType
  id: string,
  companyId: string
}

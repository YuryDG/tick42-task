import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { AppState } from '../../../store/AppStore';

import EmployeeCard from './EmployeeCard';
import ProjectList from '../../projects/components/ProjectList';

import { Employee, EmployeeIndexed } from '../types';
import { Project, ProjectIndexed } from '../../projects/types';
import { CompanyIndexed } from '../../companies/types';
import { SelectedItem } from '../../app/types';
import { getProjectsFromCompany } from '../../../utils';

type SelectData = {
  employees: EmployeeIndexed
  projects: ProjectIndexed,
  companies: CompanyIndexed,
  selectedItem: SelectedItem
}

const EmployeeDetails = (): JSX.Element => {
  const data = useSelector<AppState, SelectData>((state) => ({
    employees: state.employees,
    companies: state.companies,
    projects: state.projects,
    selectedItem: state.selectedItem,
  }));

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [employeeProjects, setProjects] = useState<Project[]>([]);

  const getProjects = () => {
    const company = data.companies[data.selectedItem.companyId];
    let currentProjects = getProjectsFromCompany(company, Object.values(data.projects));

    const hasEmployee = (employeeId: string) => employeeId === data.selectedItem.id;
    const isEmployeeInProject = ((p: Project) => p.employees.findIndex(hasEmployee) !== -1);
    currentProjects = currentProjects.filter(isEmployeeInProject);

    setProjects(currentProjects);
  };

  useEffect(() => {
    setEmployee(data.employees[data.selectedItem.id]);
    getProjects();
  }, [data.selectedItem]);

  return (
    <>
      {
        employee && <EmployeeCard employee={employee} />
      }
      <ProjectList projects={employeeProjects} />
    </>
  );
};

export default EmployeeDetails;

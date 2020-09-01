/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { AppState } from '../../../store/AppStore';
import { SelectedItem } from '../../app/types';
import { Employee, EmployeeIndexed } from '../types';
import { CompanyIndexed } from '../../companies/types';
import { Project, ProjectIndexed } from '../../projects/types';
import { getProjectsFromCompany, getEmployeesFromCompany } from '../../../utils';

type Props = {
  companies: CompanyIndexed,
  employees: EmployeeIndexed,
  projects: ProjectIndexed,
  selectedItem: SelectedItem
}

const JobAreaDetails = (props: Props): JSX.Element => {
  const {
    companies, employees, projects, selectedItem,
  } = props;

  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);

  const totalProjectsForEmployee = (employee: Employee, project: Project) => {
    const result = project.employees.filter((employeeId) => employee.id === employeeId);
    return result.length;
  };

  const calculateTotalProjects = (currentEmployees: Employee[]) => {
    const currentProjects = getProjectsFromCompany(companies[selectedItem.companyId], Object.values(projects));
    let total = 0;
    for (const employee of currentEmployees) {
      for (const project of currentProjects) {
        total += totalProjectsForEmployee(employee, project);
      }
    }
    setTotalProjects(total);
  };

  useEffect(() => {
    const currentEmployees = getEmployeesFromCompany(companies[selectedItem.companyId], Object.values(employees));
    const employeesInArea = currentEmployees.filter((item) => item.jobArea === selectedItem.id);

    setTotalEmployees(employeesInArea.length);
    calculateTotalProjects(employeesInArea);
  }, [selectedItem]);

  return (
    <>
      <div>
        <span>Job Area Details</span>
        <p>Employees in this area: {totalEmployees}</p>
        <p>Total projects: {totalProjects}</p>
      </div>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStateToProps = (state : AppState) => {
  const {
    companies, employees, projects, selectedItem,
  } = state;
  return {
    companies, employees, projects, selectedItem,
  };
};

export default connect(mapStateToProps)(JobAreaDetails);

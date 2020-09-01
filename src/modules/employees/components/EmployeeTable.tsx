/* eslint-disable react/require-default-props */
import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';

import { Employee } from '../types';
import { Project, ProjectDataTable } from '../../projects/types';

type Props = {
  rowData: ProjectDataTable,
  onRemoveEmployeeFromProject: (project: Project) => void
};

const useStyles = makeStyles({
  employeesTable: {
    backgroundColor: '#cfe8fc',
    padding: 20,
  },
});

const EmployeeTable = ({ rowData, onRemoveEmployeeFromProject }: Props): JSX.Element => {
  const classes = useStyles();

  const handleRemoveFromProject = (event: any, employee: Employee | Employee[]) => {
    if (!Array.isArray(employee)) {
      const projectUpdated = {
        id: rowData.id,
        companyId: rowData.companyId,
        name: rowData.name,
        department: rowData.department,
        employees: rowData.employees,
      };

      // remove employeeId from project "employees" list
      projectUpdated.employees = projectUpdated.employees.filter((id) => id !== employee.id);

      onRemoveEmployeeFromProject(projectUpdated);
    }
  };

  return (
    <div className={classes.employeesTable}>
      <MaterialTable<Employee>
        title="Employees"
        columns={[
          { title: 'Name', field: 'firstName' },
          { title: 'Last name', field: 'lastName' },
          { title: 'DateOfBirth', field: 'dateOfBirth', type: 'date' },
          { title: 'Job Title', field: 'jobTitle' },
          { title: 'Job Area', field: 'jobArea' },
          { title: 'Job Type', field: 'jobType' },
        ]}
        data={rowData.employeesList}
        options={{
          paging: false,
          search: false,
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: 'eject',
            tooltip: 'Remove from this project',
            onClick: handleRemoveFromProject,
          },
        ]}
      />
    </div>
  );
};

export default EmployeeTable;

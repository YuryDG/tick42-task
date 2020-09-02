/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Alert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';

import { Employee } from '../types';
import { Project } from '../../projects/types';

type Props = {
  employees: Employee[],
  projects: Project[],
  onAssignEmployees: (project: Project) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  employeesTable: {
    backgroundColor: '#cfe8fc',
    padding: 20,
  },
  formControl: {
    margin: theme.spacing(1),
    width: 120,
    marginBottom: 30,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    width: 300,
  },
}));

const ManageUnemployment = ({ employees, projects, onAssignEmployees }: Props): JSX.Element => {
  const classes = useStyles();
  const [currentProjectId, setCurrentProjectId] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleAssignToProject = (event: any, employee: Employee | Employee[]) => {
    const currentProject = projects.find((project) => project.id === currentProjectId);
    if (currentProject) {
      if (Array.isArray(employee)) {
        const ids = employee.map((emp) => emp.id);
        currentProject.employees.push(...ids);
      } else {
        currentProject.employees.push(employee.id);
      }
      onAssignEmployees(currentProject);
    } else {
      setError('You should select a project');
    }
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const projectId = event.target.value as string;
    setCurrentProjectId(projectId);
    setError('');
    const selectedProject = projects.find((project) => project.id === projectId);
    if (selectedProject) {
      setTitle(`Project: ${selectedProject.name}`);
    }
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="project-select-label">Project name</InputLabel>
        <Select
          className={classes.select}
          labelId="project-select-label"
          id="project-select"
          value={currentProjectId}
          onChange={handleChange}
        >
          {
            projects.map((project) => <MenuItem value={project.id}>{project.name}</MenuItem>)
          }
        </Select>
      </FormControl>

      <Typography component="div">
        {error && <Alert severity="error">{error}</Alert> }
      </Typography>

      <br />

      <MaterialTable<Employee>
        title={title}
        columns={[
          { title: 'Name', field: 'firstName' },
          { title: 'Last name', field: 'lastName' },
          { title: 'DateOfBirth', field: 'dateOfBirth', type: 'date' },
          { title: 'Job Title', field: 'jobTitle' },
          { title: 'Job Area', field: 'jobArea' },
          { title: 'Job Type', field: 'jobType' },
        ]}
        data={employees}
        options={{
          paging: false,
          selection: true,
        }}
        actions={[
          {
            tooltip: 'Assign to selected project',
            icon: 'group_add',
            onClick: handleAssignToProject,
          },
        ]}
      />
    </>
  );
};

export default ManageUnemployment;

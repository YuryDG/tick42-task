/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Typography } from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';
import * as API from '../../../api/api';
import { CompanyIndexed } from '../types';
import { SelectedItem } from '../../app/types';
import { EmployeeIndexed, Employee } from '../../employees/types';
import { ProjectIndexed, ProjectDataTable, Project } from '../../projects/types';
import { AppState } from '../../../store/AppStore';
import { getProjectsFromCompany, getEmployeesFromCompany, getAddressFromCompany } from '../../../utils';
import {
  updateProject,
  removeProject,
  addProject,
  removeEmployeeFromProject,
  assignEmployee,
} from '../../projects/actions';
import ProjectTable from '../../projects/components/ProjectTable';
import TabPanel from '../../app/components/TapPanel';
import CompanyCard from './CompanyCard';
import ManageUnemployment from '../../employees/components/ManageUnemployment';
import { AddressIndexed, Address } from '../../addresses/types';

type SelectData = {
  employees: EmployeeIndexed
  projects: ProjectIndexed,
  companies: CompanyIndexed,
  addresses: AddressIndexed,
  selectedItem: SelectedItem,
  loading: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const CompanyDetails = (): JSX.Element => {
  const classes = useStyles();
  const data = useSelector<AppState, SelectData>((state) => state);
  const dispatch = useDispatch();
  const [projectsData, setProjectsData] = useState<ProjectDataTable[]>([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [unemployed, setUnemployed] = useState<Employee[]>([]);
  const [error, setError] = useState('');
  const [address, setAddress] = useState<Address|undefined>(undefined);

  const getAddress = () => {
    if (data.selectedItem.currentNode === 'Company') {
      const company = data.companies[data.selectedItem.id];
      const currentAddress = getAddressFromCompany(company, data.addresses);
      setAddress(currentAddress);
    }
  };

  const formatData = () => {
    const company = data.companies[data.selectedItem.id];
    const currentProjects = getProjectsFromCompany(company, Object.values(data.projects));
    setProjects(currentProjects);

    // formatting data for table of project and employees
    const employeesIds = [];
    const result: ProjectDataTable[] = [];
    for (const project of currentProjects) {
      employeesIds.push(...project.employees);
      const employeesInCurrentProject = project.employees.map((id) => data.employees[id]);
      result.push({
        ...project,
        employeesList: employeesInCurrentProject,
      });
    }
    setProjectsData(result);

    // getting unemployed
    const currentEmployees = getEmployeesFromCompany(company, Object.values(data.employees));
    const tempUnemployed: Employee[] = [];

    // uniques ids of employees in projects
    const employeesInProject = new Set(employeesIds);

    for (const employee of currentEmployees) {
      if (!employeesInProject.has(employee.id)) {
        tempUnemployed.push(employee);
      }
    }

    setUnemployed(tempUnemployed);
  };

  useEffect(() => {
    if (data.selectedItem.currentNode === 'Company') {
      getAddress();
    }
  }, [data.selectedItem]);

  useEffect(() => {
    formatData();
  }, [data.selectedItem, data.projects]);

  const handleEditProject = async (project: Project) => {
    try {
      await API.updateProject(project);
      dispatch(updateProject(project));
    } catch (err) {
      setError(`Error editing project. Details ${err.message}`);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await API.removeProject(projectId);
      dispatch(removeProject(projectId));
    } catch (err) {
      setError(`Error deleting project. Details ${err.message}`);
    }
  };

  const handleAddProject = async (newData: any) => {
    try {
      const newProject = {
        ...newData,
        companyId: data.selectedItem.companyId,
      };
      const { data: project } = await API.addProject(newProject);
      dispatch(addProject(project));
    } catch (err) {
      setError(`Error creating new project. Details ${err.message}`);
    }
  };

  const handleRemoveEmployeeFromProject = async (project: Project) => {
    try {
      await API.updateProject(project);
      dispatch(removeEmployeeFromProject(project));
    } catch (err) {
      setError(`Error removing employee from project ${project.name}. Details ${err.message}`);
    }
  };

  const handleAssignEmployeesToProject = async (project: Project) => {
    try {
      await API.updateProject(project);
      dispatch(assignEmployee(project));
    } catch (err) {
      setError(`Error assigning employee to project ${project.name}. Details ${err.message}`);
    }
  };

  const handleChange = (event: any, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={currentTab} onChange={handleChange} aria-label="companies details">
          <Tab label="Projects" id="projects" />
          <Tab label="Employees without projects" id="employees" />
        </Tabs>
      </AppBar>
      <TabPanel value={currentTab} index={0}>
        <Typography component="div">
          {error && <Alert severity="error">{error}</Alert> }
        </Typography>

        <br />
        <CompanyCard address={address} />
        <br />
        <ProjectTable
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
          onAddProject={handleAddProject}
          onRemoveEmployeeFromProject={handleRemoveEmployeeFromProject}
          projects={projectsData}
        />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <ManageUnemployment
          onAssignEmployees={handleAssignEmployeesToProject}
          projects={projects}
          employees={unemployed}
        />
      </TabPanel>
    </div>

  );
};
export default CompanyDetails;

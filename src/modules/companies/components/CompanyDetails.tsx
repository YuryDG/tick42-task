/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import * as API from '../../../api/api';
import { CompanyIndexed } from '../types';
import { SelectedItem } from '../../app/types';
import { EmployeeIndexed, Employee } from '../../employees/types';
import { ProjectIndexed, ProjectDataTable, Project } from '../../projects/types';
import { AppState } from '../../../store/AppStore';
import { getProjectsFromCompany, getEmployeesFromCompany } from '../../../utils';
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

type SelectData = {
  employees: EmployeeIndexed
  projects: ProjectIndexed,
  companies: CompanyIndexed,
  selectedItem: SelectedItem,
  loading: boolean
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
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
    formatData();
  }, [data.selectedItem, data.projects]);

  const handleEditProject = async (project: Project) => {
    try {
      await API.updateProject(project);
      dispatch(updateProject(project));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await API.removeProject(projectId);
      dispatch(removeProject(projectId));
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveEmployeeFromProject = async (project: Project) => {
    await API.updateProject(project);
    dispatch(removeEmployeeFromProject(project));
  };

  const handleAssignEmployeesToProject = async (project: Project) => {
    await API.updateProject(project);
    dispatch(assignEmployee(project));
  };

  const handleChange = (event: any, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={currentTab} onChange={handleChange} aria-label="companies details">
          <Tab label="Projects" {...a11yProps(0)} />
          <Tab label="Employees without projects" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={currentTab} index={0}>
        <CompanyCard company={data.companies[data.selectedItem.companyId]} />
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

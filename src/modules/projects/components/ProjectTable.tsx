import React from 'react';
import MaterialTable from 'material-table';
import { ProjectDataTable, Project } from '../types';
import EmployeeTable from '../../employees/components/EmployeeTable';

type Props = {
  projects: ProjectDataTable[],
  onEditProject: (project: Project) => void
  onRemoveEmployeeFromProject: (project: Project) => void
  onDeleteProject: (projectId: string) => void
  onAddProject: (data: any) => void
};

const ProjectTable = (props: Props): JSX.Element => {
  const {
    onEditProject,
    onDeleteProject,
    onAddProject,
    onRemoveEmployeeFromProject,
  } = props;
  const { projects } = props;

  // eslint-disable-next-line max-len
  const handleUpdateProject = (newData: ProjectDataTable, oldData: ProjectDataTable | undefined) => {
    const { name, department } = newData;
    return new Promise((resolve) => {
      if (oldData) {
        const { name: oldName, department: oldDepartment } = oldData;
        if (oldDepartment !== department || name !== oldName) {
          const projectToUpdate = {
            id: newData.id,
            name: newData.name,
            department: newData.department,
            employees: newData.employees,
            companyId: newData.companyId,
          };
          onEditProject(projectToUpdate);
        }
      }
      resolve();
    });
  };

  const handleDeleteProject = (oldData: ProjectDataTable) => new Promise((resolve) => {
    onDeleteProject(oldData.id);
    resolve();
  });

  const handleAddProject = (newData: any) => new Promise((resolve) => {
    const newProject = { ...newData, employees: [], companyId: '' };
    onAddProject(newProject);
    resolve();
  });

  const validateDepartment = (rowData: ProjectDataTable) => {
    const { department } = rowData;
    const isDepartmentValid = department && department.length > 3;
    if (!isDepartmentValid) {
      return { isValid: false, helperText: 'Department must be longer than 3 chars' };
    }
    return true;
  };

  const validateName = (rowData: ProjectDataTable) => {
    const { name } = rowData;
    const isNameValid = name && name.length > 3;
    if (!isNameValid) {
      return { isValid: false, helperText: 'Name must be longer than 3 chars' };
    }
    return true;
  };

  return (
    <MaterialTable
      title="Projects"
      columns={[
        { title: 'Name', field: 'name', validate: validateName },
        { title: 'Department', field: 'department', validate: validateDepartment },
      ]}
      data={projects}
      options={{
        actionsColumnIndex: -1,
        paging: false,
      }}
      detailPanel={(rowData) => (
        <EmployeeTable
          onRemoveEmployeeFromProject={onRemoveEmployeeFromProject}
          rowData={rowData}
        />
      )}
      editable={{
        onRowAdd: handleAddProject,
        onRowUpdate: handleUpdateProject,
        onRowDelete: handleDeleteProject,
      }}
    />
  );
};

export default ProjectTable;

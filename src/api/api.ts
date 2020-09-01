import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { Company } from '../modules/companies/types';
import { Employee } from '../modules/employees/types';
import { Address } from '../modules/addresses/types';
import { Project } from '../modules/projects/types';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3005/',
});

// eslint-disable-next-line import/prefer-default-export
export const getCompanies = ():Promise<AxiosResponse<Company[]>> => api.get('companies');
export const getEmployees = ():Promise<AxiosResponse<Employee[]>> => api.get('employees');
export const getCompanyAddress = (id: string):Promise<AxiosResponse<Address[]>> => api.get(`companies/${id}/addresses`);
export const getCompanyProjects = (id: string):Promise<AxiosResponse<Project[]>> => api.get(`companies/${id}/projects`);

export const updateProject = (project: Project):Promise<AxiosResponse<Project>> => api.put(`projects/${project.id}`, project);
export const addProject = (project: Project):Promise<AxiosResponse<Project>> => api.post('projects', project);
export const removeProject = (id: string):Promise<AxiosResponse> => api.delete(`projects/${id}`);

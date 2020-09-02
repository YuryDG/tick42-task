/* eslint-disable max-len */
import { Dispatch } from 'redux';

import { Company } from '../types';
import { Project } from '../../projects/types';
import { Address } from '../../addresses/types';
import { Employee } from '../../employees/types';

import * as API from '../../../api/api';

export enum CompanyActions {
  LOAD_COMPANIES = 'COMPANIES/LOAD_COMPANIES',
  COMPANIES_LOADED = 'COMPANIES/COMPANIES_LOADED',
  ERROR_LOADING_COMPANIES = 'COMPANIES/ERROR_LOADING_COMPANIES',

  LOAD_COMPANY = 'COMPANIES/LOAD_COMPANY',
  COMPANY_LOADED = 'COMPANIES/COMPANY_LOADED',
  ERROR_LOADING_COMPANY = 'COMPANIES/ERROR_LOADING_COMPANY',
}

type LoadCompanies = {
  type: CompanyActions.LOAD_COMPANIES
}

type CompaniesLoaded = {
  type: CompanyActions.COMPANIES_LOADED
  payload: {
    companies: Company[],
    employees: Employee[],
  }
}

type ErrorLoadingCompanies = {
  type: CompanyActions.ERROR_LOADING_COMPANIES
  payload: {
    error: string
  }
}

type LoadCompany = {
  type: CompanyActions.LOAD_COMPANY
  payload:{
    id: string
  }
}

type CompanyLoaded = {
  type: CompanyActions.COMPANY_LOADED
  payload: {
    address: Address | null,
    projects: Project[]
  }
}

type ErrorLoadingCompany = {
  type: CompanyActions.ERROR_LOADING_COMPANY
  payload: {
    error: string
  }
}

// action creators
export const loadCompanies = (): LoadCompanies => ({
  type: CompanyActions.LOAD_COMPANIES,
});

export const companiesLoaded = (companies: Company[], employees: Employee[]):
CompaniesLoaded => ({
  type: CompanyActions.COMPANIES_LOADED,
  payload: { companies, employees },
});

export const errorLoadCompanies = (error: string): ErrorLoadingCompanies => ({
  type: CompanyActions.ERROR_LOADING_COMPANIES,
  payload: { error },
});

export const loadingCompany = (id: string): LoadCompany => ({
  type: CompanyActions.LOAD_COMPANY,
  payload: { id },
});

export const companyLoaded = (address: Address | undefined, projects: Project[]): CompanyLoaded => ({
  type: CompanyActions.COMPANY_LOADED,
  payload: { address, projects },
});

export const errorLoadingCompany = (error: string): ErrorLoadingCompany => ({
  type: CompanyActions.ERROR_LOADING_COMPANY,
  payload: { error },
});

// Thunk async actions
export const fetchInitialData = () => async (dispatch: Dispatch<CompanyActionTypes>):
Promise<void> => {
  try {
    dispatch(loadCompanies());
    const { data: companies } = await API.getCompanies();
    const { data: employees } = await API.getEmployees();
    dispatch(companiesLoaded(companies, employees));
  } catch (error) {
    dispatch(errorLoadCompanies(error.message));
  }
};

export const loadCompanyData = (companyId: string) => async (dispatch: Dispatch<CompanyActionTypes>):
Promise<void> => {
  try {
    dispatch(loadingCompany(companyId));
    const { data: addresses } = await API.getCompanyAddress(companyId);
    const { data: projects } = await API.getCompanyProjects(companyId);
    const address = addresses.length > 0 ? addresses[0] : null;
    dispatch(companyLoaded(address, projects));
  } catch (error) {
    dispatch(errorLoadingCompany(error.message));
  }
};

export type CompanyActionTypes = LoadCompanies | CompaniesLoaded
| ErrorLoadingCompanies | LoadCompany | CompanyLoaded | ErrorLoadingCompany

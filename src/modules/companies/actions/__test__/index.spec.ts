/* eslint-disable jest/prefer-strict-equal */
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';
import {
  loadCompanies,
  companiesLoaded,
  fetchInitialData,
  errorLoadCompanies,
  loadingCompany,
  companyLoaded,
  loadCompanyData,
  errorLoadingCompany,
} from '..';
import {
  companies, employees, addresses, projects,
} from '../../../../test-data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('app/actions', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('asdasd asd as d', () => {
    expect(true).toBeTruthy();
  });

  it('fetchInitialData: should dispatch the right action when open the page', () => {
    const responseCompanies = { data: companies };
    const responseEmployees = { data: employees };

    jest.spyOn(axios, 'get').mockImplementation()
      .mockResolvedValueOnce(responseCompanies)
      .mockResolvedValueOnce(responseEmployees);

    const expectedActions = [
      loadCompanies(),
      companiesLoaded(responseCompanies.data, responseEmployees.data),
    ];

    const store = mockStore({});

    // eslint-disable-next-line jest/no-test-return-statement
    return store.dispatch<any>(fetchInitialData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetchInitialData: should dispatch an error', () => {
    const errorResponse = { message: 'Network Error' };
    jest.spyOn(axios, 'get').mockImplementation().mockRejectedValue(errorResponse);

    const expectedActions = [
      loadCompanies(),
      errorLoadCompanies(errorResponse.message),
    ];

    const store = mockStore({});

    // eslint-disable-next-line jest/no-test-return-statement
    return store.dispatch<any>(fetchInitialData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('loadCompanyData: should dispatch the right action when load a company', () => {
    const responseAddresses = { data: [addresses[0]] };
    const responseProjects = { data: [projects[0]] };

    jest.spyOn(axios, 'get').mockImplementation()
      .mockResolvedValueOnce(responseAddresses)
      .mockResolvedValueOnce(responseProjects);

    const expectedActions = [
      loadingCompany('1'),
      companyLoaded(responseAddresses.data[0], responseProjects.data),
    ];

    const store = mockStore({});

    // eslint-disable-next-line jest/no-test-return-statement
    return store.dispatch<any>(loadCompanyData('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('loadCompanyData: should dispatch an error when loading a company fails', () => {
    const responseError = { message: 'Network Error' };

    jest.spyOn(axios, 'get')
      .mockImplementation()
      .mockRejectedValue(responseError);

    const expectedActions = [
      loadingCompany('1'),
      errorLoadingCompany(responseError.message),
    ];

    const store = mockStore({});

    // eslint-disable-next-line jest/no-test-return-statement
    return store.dispatch<any>(loadCompanyData('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

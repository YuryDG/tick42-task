/* eslint-disable jest/prefer-strict-equal */
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import mockAxios from 'jest-mock-axios';
import thunk from 'redux-thunk';
import { loadDataForCurrentItem, updateSelectedItem } from '..';

import { loadingCompany, companyLoaded } from '../../../companies/actions';
import { addresses, projects } from '../../../../test-data';
import { SelectedItem } from '../../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    jest.resetAllMocks();
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
  });

  it('should dispatch the right action when click on a company', () => {
    const responseAddresses = { data: [addresses[0]] };
    const responseProjects = { data: [projects[0]] };

    const selectedItem: SelectedItem = {
      currentNode: 'Company',
      id: '1',
      companyId: '1',
    };

    jest.spyOn(axios, 'get').mockImplementation()
      .mockResolvedValueOnce(responseAddresses)
      .mockResolvedValueOnce(responseProjects);

    const expectedActions = [
      loadingCompany('1'),
      companyLoaded(responseAddresses.data[0], responseProjects.data),
      updateSelectedItem(selectedItem),
    ];

    const store = mockStore({});

    // eslint-disable-next-line jest/no-test-return-statement
    return store.dispatch<any>(loadDataForCurrentItem(selectedItem)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch the right action when click a job area', () => {
    const store = mockStore({});
    const selectedItem: SelectedItem = {
      currentNode: 'JobArea',
      id: '1',
      companyId: '1',
    };
    const expectedActions = [updateSelectedItem(selectedItem)];

    // eslint-disable-next-line jest/no-test-return-statement
    return store.dispatch<any>(loadDataForCurrentItem(selectedItem)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch the right action when click an employee', () => {
    const store = mockStore({});
    const selectedItem: SelectedItem = {
      currentNode: 'Employee',
      id: '1',
      companyId: '1',
    };
    const expectedActions = [updateSelectedItem(selectedItem)];

    // eslint-disable-next-line jest/no-test-return-statement
    return store.dispatch<any>(loadDataForCurrentItem(selectedItem)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

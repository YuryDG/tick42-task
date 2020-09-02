/* eslint-disable jest/prefer-strict-equal */
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';
import { loadDataForCurrentItem, updateSelectedItem } from '..';

import { SelectedItem } from '../../types';
import { addresses, projects } from '../../../../test-data';
import { loadingCompany, companyLoaded } from '../../../companies/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('app/actions', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('loadDataForCurrentItem: should dispatch the right action when click on a company', () => {
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

  it('loadDataForCurrentItem: should dispatch the right action when click a job area', () => {
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

  it('loadDataForCurrentItem: should dispatch the right action when click an employee', () => {
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

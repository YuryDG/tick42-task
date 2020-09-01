import { Dispatch } from 'redux';
import { SelectedItem } from '../types';
import { loadCompanyData } from '../../companies/actions';

export enum AppActions {
  UPDATE_SELECTED_ITEM = 'APP/UPDATE_SELECTED_ITEM',
}

type UpdateSelectedItem = {
  type: AppActions.UPDATE_SELECTED_ITEM
  payload:{ selectedItem: SelectedItem }
}

export const updateSelectedItem = (selectedItem: SelectedItem): UpdateSelectedItem => ({
  type: AppActions.UPDATE_SELECTED_ITEM,
  payload: { selectedItem },
});

// eslint-disable-next-line max-len
export const loadDataForCurrentItem = (selectedItem: SelectedItem) => async (dispatch: Dispatch<any>) => {
  if (selectedItem.currentNode === 'Company') {
    await dispatch(loadCompanyData(selectedItem.companyId));
  }
  dispatch(updateSelectedItem(selectedItem));
};

export type AppActionsTypes = UpdateSelectedItem

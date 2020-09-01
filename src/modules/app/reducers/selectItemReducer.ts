import { SelectedItem } from '../types';
import { AppActions, AppActionsTypes } from '../actions';

export const initialState: SelectedItem = {
  currentNode: 'None',
  id: '',
  companyId: '',
};

const selectItemReducer = (state = initialState, action: AppActionsTypes): SelectedItem => {
  switch (action.type) {
    case AppActions.UPDATE_SELECTED_ITEM:
      return {
        ...action.payload.selectedItem,
      };
    default:
      return state;
  }
};

export default selectItemReducer;

import { AddressIndexed } from '../types';
import { CompanyActions, CompanyActionTypes } from '../../companies/actions';

// eslint-disable-next-line max-len
const addressesReducer = (state: AddressIndexed = {}, action: CompanyActionTypes):
AddressIndexed => {
  console.time('addressesReducer');
  switch (action.type) {
    case CompanyActions.COMPANY_LOADED: {
      const { address } = action.payload;
      const result = {
        ...state,
        [address.id]: address,
      };
      console.timeLog('addressesReducer');
      return result;
    }
    default:
      return state;
  }
};

export default addressesReducer;

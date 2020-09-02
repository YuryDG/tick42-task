import { AddressIndexed } from '../types';
import { CompanyActions, CompanyActionTypes } from '../../companies/actions';

// eslint-disable-next-line max-len
const addressesReducer = (state: AddressIndexed = {}, action: CompanyActionTypes): AddressIndexed => {
  switch (action.type) {
    case CompanyActions.COMPANY_LOADED: {
      const { address } = action.payload;
      let result = state;
      if (address) {
        result = {
          ...state,
          [address.id]: address,
        };
      }
      return result;
    }
    default:
      return state;
  }
};

export default addressesReducer;

import { CompanyIndexed } from '../types';
import { CompanyActionTypes, CompanyActions } from '../actions';

const companiesReducer = (state: CompanyIndexed = {}, action: CompanyActionTypes):
CompanyIndexed => {
  switch (action.type) {
    case CompanyActions.COMPANIES_LOADED: {
      const { companies } = action.payload;
      const result = companies.reduce<CompanyIndexed>((indexed, item) => {
        // eslint-disable-next-line no-param-reassign
        indexed[item.id] = item;
        return indexed;
      }, {});

      return result;
    }
    default:
      return state;
  }
};

export default companiesReducer;

import { EmployeeIndexed } from '../types';
import { CompanyActions, CompanyActionTypes } from '../../companies/actions';

const employeesReducer = (state: EmployeeIndexed = {}, action: CompanyActionTypes):
EmployeeIndexed => {
  switch (action.type) {
    case CompanyActions.LOAD_COMPANIES:
    case CompanyActions.ERROR_LOADING_COMPANIES:
      return {};
    case CompanyActions.COMPANIES_LOADED: {
      const { employees } = action.payload;
      const result = employees.reduce<EmployeeIndexed>((ac, item) => {
        // eslint-disable-next-line no-param-reassign
        ac[item.id] = item;
        return ac;
      }, {});
      return result;
    }
    default:
      return state;
  }
};

export default employeesReducer;

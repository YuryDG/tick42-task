import { CompanyActions, CompanyActionTypes } from '../../companies/actions';

const loadingReducer = (state = false, action: CompanyActionTypes): boolean => {
  switch (action.type) {
    case CompanyActions.LOAD_COMPANIES:
      return true;
    default:
      return state;
  }
};
export default loadingReducer;

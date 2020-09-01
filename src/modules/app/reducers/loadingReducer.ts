import { CompanyActions, CompanyActionTypes } from '../../companies/actions';

const loadingReducer = (state = false, action: CompanyActionTypes): boolean => {
  switch (action.type) {
    case CompanyActions.LOAD_COMPANIES:
      return true;
    case CompanyActions.ERROR_LOADING_COMPANIES:
    case CompanyActions.COMPANIES_LOADED:
      return false;
    default:
      return state;
  }
};
export default loadingReducer;

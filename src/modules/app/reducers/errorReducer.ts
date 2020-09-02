import { CompanyActions, CompanyActionTypes } from '../../companies/actions';

const errorReducer = (state = '', action: CompanyActionTypes):string => {
  switch (action.type) {
    case CompanyActions.ERROR_LOADING_COMPANIES:
      return action.payload.error;
    default:
      return state;
  }
};

export default errorReducer;

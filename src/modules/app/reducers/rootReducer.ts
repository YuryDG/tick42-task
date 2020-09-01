import { combineReducers } from 'redux';

import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';
import selectItemReducer from './selectItemReducer';
import projectsReducer from '../../projects/reducers/projectsReducer';
import companiesReducer from '../../companies/reducers/companyReducer';
import employeesReducer from '../../employees/reducers/employeesReducer';
import addressesReducer from '../../addresses/reducers/addressesReducer';

const rootReducer = combineReducers({
  loading: loadingReducer,
  projects: projectsReducer,
  errorMessage: errorReducer,
  companies: companiesReducer,
  employees: employeesReducer,
  addresses: addressesReducer,
  selectedItem: selectItemReducer,
});

export default rootReducer;

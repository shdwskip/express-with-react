import { combineReducers } from 'redux';

import navigationNodesReducer from './navigationNodesReducer';
import companyDetailsReducer from './companyDetailsReducer';
import projectDetailsReducer from './projectDetailsReducer';
import employeeDetailsReducer from './employeeDetailsReducer';

const rootReducer = combineReducers({
  navNodes: navigationNodesReducer,
  companyDetails: companyDetailsReducer,
  projectDetails: projectDetailsReducer,
  employeeDetails: employeeDetailsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

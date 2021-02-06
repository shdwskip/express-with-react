import { combineReducers } from 'redux';

import navigationNodesReducer from './navigationNodesReducer';
import companyDetailsReducer from './companyDetailsReducer';
import projectDetailsReducer from './projectDetailsReducer';
import employeeDetailsReducer from './employeeDetailsReducer';
import jobAreaDetailsReducer from './jobAreaDetailsReducer';
import detailsViewReducer from './detailsViewReducer';

const rootReducer = combineReducers({
  navNodes: navigationNodesReducer,
  companyDetails: companyDetailsReducer,
  projectDetails: projectDetailsReducer,
  employeeDetails: employeeDetailsReducer,
  jobAreaDetails: jobAreaDetailsReducer,
  detailsView: detailsViewReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

import { combineReducers } from 'redux';

import navigationNodesReducer from './navigationNodesReducer';
import companyDetailsReducer from './companyDetailsReducer';
import projectDetailsReducer from './projectDetailsReducer';

const rootReducer = combineReducers({
  navNodes: navigationNodesReducer,
  companyDetails: companyDetailsReducer,
  projectDetails: projectDetailsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

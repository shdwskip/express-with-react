import { combineReducers } from 'redux';

import navigationNodesReducer from './navigationNodesReducer';
import companyDetailsReducer from './companyDetailsReducer';

const rootReducer = combineReducers({
  navNodes: navigationNodesReducer,
  companyDetails: companyDetailsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

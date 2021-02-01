import { combineReducers } from 'redux';

import navigationNodesReducer from './navigationNodesReducer';

const rootReducer = combineReducers({
  navNodes: navigationNodesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

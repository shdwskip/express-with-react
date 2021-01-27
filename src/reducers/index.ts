import { combineReducers } from 'redux';

import companiesReducer from './companiesReducer';

export default combineReducers({
  companies: companiesReducer,
});

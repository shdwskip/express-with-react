import {
  GET_COMPANY_DETAILS_FAIL,
  GET_COMPANY_DETAILS_START,
  GET_COMPANY_DETAILS_SUCCESS,
  GET_EMPLOYEE_DETAILS_FAIL,
  GET_EMPLOYEE_DETAILS_START,
  GET_EMPLOYEE_DETAILS_SUCCESS,
  GET_NAVIGATION_NODES_FAIL,
  GET_NAVIGATION_NODES_START,
  GET_NAVIGATION_NODES_SUCCESS,
  UPDATE_PROJECT_DETAILS_FAIL,
  UPDATE_PROJECT_DETAILS_START,
  UPDATE_PROJECT_DETAILS_SUCCESS,
} from '../actions';
import { ActionCreator } from '../common/generic.types';
interface ILoader {
  isLoading: boolean;
}

const initialState: ILoader = {
  isLoading: false,
};

export default (state = initialState, action: ActionCreator): ILoader => {
  switch (action.type) {
    case GET_COMPANY_DETAILS_START:
    case GET_EMPLOYEE_DETAILS_START:
    case GET_NAVIGATION_NODES_START:
    case UPDATE_PROJECT_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      };

    case GET_COMPANY_DETAILS_SUCCESS:
    case GET_EMPLOYEE_DETAILS_SUCCESS:
    case GET_NAVIGATION_NODES_SUCCESS:
    case UPDATE_PROJECT_DETAILS_SUCCESS:
    case GET_COMPANY_DETAILS_FAIL:
    case GET_EMPLOYEE_DETAILS_FAIL:
    case GET_NAVIGATION_NODES_FAIL:
    case UPDATE_PROJECT_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

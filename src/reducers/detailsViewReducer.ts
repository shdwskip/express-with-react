import {
  GET_COMPANY_DETAILS_FROM_STORE,
  GET_COMPANY_DETAILS_SUCCESS,
  GET_EMPLOYEE_DETAILS_FROM_STORE,
  GET_EMPLOYEE_DETAILS_SUCCESS,
  SHOW_JOB_AREA_DETAILS,
} from '../actions';
import { ActionCreator, TreeNodeType } from '../common/generic.types';

interface IDetailsState {
  viewType: TreeNodeType;
}

const initialState: IDetailsState = {
  viewType: null,
};

export default (state = initialState, action: ActionCreator): IDetailsState => {
  switch (action.type) {
    case GET_COMPANY_DETAILS_SUCCESS:
    case GET_COMPANY_DETAILS_FROM_STORE:
      return {
        ...state,
        viewType: TreeNodeType.COMPANY,
      };

    case SHOW_JOB_AREA_DETAILS:
      return {
        ...state,
        viewType: TreeNodeType.JOBAREA,
      };

    case GET_EMPLOYEE_DETAILS_SUCCESS:
    case GET_EMPLOYEE_DETAILS_FROM_STORE:
      return {
        ...state,
        viewType: TreeNodeType.EMPLOYEE,
      };

    default:
      return state;
  }
};

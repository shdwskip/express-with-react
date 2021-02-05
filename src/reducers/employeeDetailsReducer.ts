import {
  GET_EMPLOYEE_DETAILS_FAIL,
  GET_EMPLOYEE_DETAILS_SUCCESS,
} from '../actions/employeeActions';
import { IEmployee } from '../common/employee.types';

interface IEmployeeDetailsAction {
  type: typeof GET_EMPLOYEE_DETAILS_SUCCESS | typeof GET_EMPLOYEE_DETAILS_FAIL;
  payload: IEmployee;
}

const initialState: IEmployee = {
  id: null,
  firstName: null,
  lastName: null,
  dateOfBirth: null,
  companyId: null,
  jobTitle: null,
  jobArea: null,
  jobType: null,
  projects: null,
};

export default (
  state = initialState,
  action: IEmployeeDetailsAction
): IEmployee => {
  switch (action.type) {
    case GET_EMPLOYEE_DETAILS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case GET_EMPLOYEE_DETAILS_FAIL:
      return { ...initialState };

    default:
      return state;
  }
};

import { AppThunk } from '../common/generic.types';

export const GET_EMPLOYEE_DETAILS_START = 'GET_EMPLOYEE_DETAILS_START';
export const GET_EMPLOYEE_DETAILS_SUCCESS = 'GET_EMPLOYEE_DETAILS_SUCCESS';
export const GET_EMPLOYEE_DETAILS_FAIL = 'GET_EMPLOYEE_DETAILS_FAIL';

export const getEmployeeDetails = (employeeId: string): AppThunk => async (
  dispatch
) => {
  dispatch({ type: GET_EMPLOYEE_DETAILS_START });

  try {
    const result = await fetch(`http://localhost:5000/employee/${employeeId}`);
    const data = await result.json();

    // simulating response delay
    setTimeout(() => {
      dispatch({ type: GET_EMPLOYEE_DETAILS_SUCCESS, payload: data });
    }, 1000);
  } catch (error) {
    dispatch({ type: GET_EMPLOYEE_DETAILS_FAIL, payload: error });
  }
};

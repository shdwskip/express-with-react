import { AppThunk } from '../common/generic.types';
import { apiURL, SIMULATED_LOADING_TIME_IN_MS } from '../common/constants';
import store from '../store';
import httpClient from '../httpClient';

export const GET_EMPLOYEE_DETAILS_START = 'GET_EMPLOYEE_DETAILS_START';
export const GET_EMPLOYEE_DETAILS_SUCCESS = 'GET_EMPLOYEE_DETAILS_SUCCESS';
export const GET_EMPLOYEE_DETAILS_FAIL = 'GET_EMPLOYEE_DETAILS_FAIL';
export const GET_EMPLOYEE_DETAILS_FROM_STORE =
  'GET_EMPLOYEE_DETAILS_FROM_STORE';

export const getEmployeeDetails = (employeeId: string): AppThunk => async (
  dispatch
) => {
  const { employeeDetails } = store.getState();

  if (employeeId === employeeDetails.id) {
    dispatch({ type: GET_EMPLOYEE_DETAILS_FROM_STORE });
  } else {
    dispatch({ type: GET_EMPLOYEE_DETAILS_START });

    try {
      const result = await httpClient.get(`${apiURL.employees}/${employeeId}`);
      const data = await result.json();

      // simulating response delay
      setTimeout(() => {
        dispatch({ type: GET_EMPLOYEE_DETAILS_SUCCESS, payload: data });
      }, SIMULATED_LOADING_TIME_IN_MS);
    } catch (error) {
      dispatch({ type: GET_EMPLOYEE_DETAILS_FAIL, payload: error });
    }
  }
};

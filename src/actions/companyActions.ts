import { AppThunk } from '../common/generic.types';
import { apiURL, SIMULATED_LOADING_TIME_IN_MS } from '../common/constants';
import store from '../store';
import httpClient from '../httpClient';

export const GET_COMPANY_DETAILS_START = 'GET_COMPANY_DETAILS_START';
export const GET_COMPANY_DETAILS_SUCCESS = 'GET_COMPANY_DETAILS_SUCCESS';
export const GET_COMPANY_DETAILS_FAIL = 'GET_COMPANY_DETAILS_FAIL';
export const GET_COMPANY_DETAILS_FROM_STORE = 'GET_COMPANY_DETAILS_FROM_STORE';

export const getCompanyDetails = (companyId: string): AppThunk => async (
  dispatch
) => {
  const { companyDetails } = store.getState();

  if (companyDetails.id === companyId) {
    dispatch({ type: GET_COMPANY_DETAILS_FROM_STORE });
  } else {
    dispatch({ type: GET_COMPANY_DETAILS_START });

    try {
      const result = await httpClient.get(`${apiURL.companies}/${companyId}`);
      const data = await result.json();

      // simulating response delay
      setTimeout(() => {
        dispatch({ type: GET_COMPANY_DETAILS_SUCCESS, payload: data });
      }, SIMULATED_LOADING_TIME_IN_MS);
    } catch (error) {
      dispatch({ type: GET_COMPANY_DETAILS_FAIL, payload: error });
    }
  }
};

import { AppThunk } from '../common/generic.types';
import store from '../store';

export const GET_COMPANY_DETAILS_START = 'GET_COMPANY_DETAILS_START';
export const GET_COMPANY_DETAILS_SUCCESS = 'GET_COMPANY_DETAILS_SUCCESS';
export const GET_COMPANY_DETAILS_FAIL = 'GET_COMPANY_DETAILS_FAIL';
export const GET_COMPANY_DETAILS_FROM_STORE = 'GET_COMPANY_DETAILS_FROM_STORE';

export const getCompanyDetails = (companyId: string): AppThunk => async (
  dispatch
) => {
  dispatch({ type: GET_COMPANY_DETAILS_START });

  const { companyDetails } = store.getState();

  if (companyDetails.id === companyId) {
    dispatch({ type: GET_COMPANY_DETAILS_FROM_STORE });
  } else {
    try {
      const result = await fetch(`http://localhost:5000/company/${companyId}`);
      const data = await result.json();

      // simulating response delay
      setTimeout(() => {
        dispatch({ type: GET_COMPANY_DETAILS_SUCCESS, payload: data });
      }, 1000);
    } catch (error) {
      dispatch({ type: GET_COMPANY_DETAILS_FAIL, payload: error });
    }
  }
};

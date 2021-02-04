import { AppThunk } from '../common/generic.types';

export const GET_COMPANY_DETAILS_START = 'GET_COMPANY_DETAILS_START';
export const GET_COMPANY_DETAILS_SUCCESS = 'GET_COMPANY_DETAILS_SUCCESS';
export const GET_COMPANY_DETAILS_FAIL = 'GET_COMPANY_DETAILS_FAIL';

export const getCompanyDetails = (companyId: string): AppThunk => async (
  dispatch
) => {
  dispatch({ type: GET_COMPANY_DETAILS_START });

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
};

import {
  GET_COMPANY_DETAILS_FAIL,
  GET_COMPANY_DETAILS_SUCCESS,
} from '../actions';
import { ICompanyDetails } from '../common/company.types';

interface ICompanyDetailsAction {
  type: typeof GET_COMPANY_DETAILS_SUCCESS | typeof GET_COMPANY_DETAILS_FAIL;
  payload: ICompanyDetails;
}

type CompanyDetailsState = ICompanyDetails;

const initialState: CompanyDetailsState = {
  id: null,
  name: null,
  slogan: null,
  business: null,
  address: null,
  projects: null,
};

export default (
  state = initialState,
  action: ICompanyDetailsAction
): CompanyDetailsState => {
  switch (action.type) {
    case GET_COMPANY_DETAILS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_COMPANY_DETAILS_FAIL:
      return {
        ...state,
        id: null,
        name: null,
        slogan: null,
        business: null,
        address: null,
        projects: null,
      };
    default:
      return state;
  }
};

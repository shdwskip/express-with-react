import {
  GET_COMPANY_DETAILS_FAIL,
  GET_COMPANY_DETAILS_SUCCESS,
  GET_EMPLOYEE_DETAILS_SUCCESS,
  IProjectDetailsPayload,
  UPDATE_PROJECT_DETAILS_SUCCESS,
} from '../actions';
import { ICompanyDetails } from '../common/company.types';

interface ICompanyDetailsAction {
  type:
    | typeof GET_COMPANY_DETAILS_SUCCESS
    | typeof GET_COMPANY_DETAILS_FAIL
    | typeof UPDATE_PROJECT_DETAILS_SUCCESS
    | typeof GET_EMPLOYEE_DETAILS_SUCCESS;
  payload: ICompanyDetails | IProjectDetailsPayload;
}

type CompanyDetailsState = ICompanyDetails;

const initialState: CompanyDetailsState = {
  id: null,
  name: null,
  slogan: null,
  business: null,
  address: null,
  projects: null,
  employees: null,
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

    case UPDATE_PROJECT_DETAILS_SUCCESS: {
      const { id } = action.payload;
      const projects = [...state.projects];
      const projectToUpdateIndex = projects.findIndex((p) => p.id === id);

      projects[projectToUpdateIndex] = {
        ...projects[projectToUpdateIndex],
        ...action.payload,
      };

      return {
        ...state,
        projects,
      };
    }

    case GET_EMPLOYEE_DETAILS_SUCCESS:
      return {
        ...initialState,
      };

    case GET_COMPANY_DETAILS_FAIL:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

import { GET_COMPANY_DETAILS_START, SELECT_PROJECT } from '../actions';
import { ICompanyProject } from '../common/company.types';

interface IProjectDetailsAction {
  type: typeof SELECT_PROJECT | typeof GET_COMPANY_DETAILS_START;
  payload: ICompanyProject;
}

const initialState: ICompanyProject = {
  id: null,
  name: null,
  department: null,
  companyId: null,
  employeesId: [],
};

export default (
  state = initialState,
  action: IProjectDetailsAction
): ICompanyProject => {
  switch (action.type) {
    case SELECT_PROJECT:
      return {
        ...state,
        ...action.payload,
      };
    case GET_COMPANY_DETAILS_START:
      return { ...initialState };
    default:
      return state;
  }
};

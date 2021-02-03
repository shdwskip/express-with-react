import { SELECT_PROJECT } from '../actions';
import { ICompanyProject } from '../common/company.types';

interface IProjectDetailsAction {
  type: typeof SELECT_PROJECT;
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
    default:
      return state;
  }
};

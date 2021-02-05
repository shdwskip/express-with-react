import { ActionCreator, AppThunk } from '../common/generic.types';
import { ICompanyProject } from '../common/company.types';

export const SELECT_PROJECT = 'SELECT_PROJECT';
export const UPDATE_PROJECT_DETAILS_START = 'UPDATE_PROJECT_DETAILS_START';
export const UPDATE_PROJECT_DETAILS_SUCCESS = 'UPDATE_PROJECT_DETAILS_SUCCESS';
export const UPDATE_PROJECT_DETAILS_FAIL = 'UPDATE_PROJECT_DETAILS_FAIL';

export const selectProject = (project: ICompanyProject): ActionCreator => ({
  type: SELECT_PROJECT,
  payload: project,
});

export interface IProjectDetailsPayload {
  id: string;
  name: string;
  department: string;
  employeesId: string[];
}
export const updateProjectDetails = (
  payload: IProjectDetailsPayload
): AppThunk => async (dispatch) => {
  dispatch({ type: UPDATE_PROJECT_DETAILS_START });

  try {
    await fetch(`http://localhost:5000/project/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch({ type: UPDATE_PROJECT_DETAILS_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: UPDATE_PROJECT_DETAILS_FAIL, payload: error });
  }
};

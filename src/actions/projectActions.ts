import { ActionCreator, AppThunk } from '../common/generic.types';
import { ICompanyProject } from '../common/company.types';
import { apiURL, SIMULATED_LOADING_TIME_IN_MS } from '../common/constants';
import httpClient from '../httpClient';

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
    await httpClient.post(`${apiURL.projects}/${payload.id}`, payload);

    // simulating response delay
    setTimeout(() => {
      dispatch({ type: UPDATE_PROJECT_DETAILS_SUCCESS, payload });
    }, SIMULATED_LOADING_TIME_IN_MS);
  } catch (error) {
    dispatch({ type: UPDATE_PROJECT_DETAILS_FAIL, payload: error });
  }
};

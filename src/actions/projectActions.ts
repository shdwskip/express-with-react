import { ActionCreator } from '../common/generic.types';
import { ICompanyProject } from '../common/company.types';

export const SELECT_PROJECT = 'SELECT_PROJECT';

export const selectProject = (project: ICompanyProject): ActionCreator => ({
  type: SELECT_PROJECT,
  payload: project,
});

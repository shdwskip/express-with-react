import { SHOW_JOB_AREA_DETAILS } from '../actions';
import { IJobArea } from '../common/employee.types';

export interface IJobAreaAction {
  type: typeof SHOW_JOB_AREA_DETAILS;
  payload: IJobArea;
}

const initialState: IJobArea = {
  totalEmployees: 0,
  totalProjects: 0,
};

export default (state = initialState, action: IJobAreaAction): IJobArea => {
  switch (action.type) {
    case SHOW_JOB_AREA_DETAILS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

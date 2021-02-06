import { ActionCreator, RenderTree } from '../common/generic.types';
import store from '../store';

export const SHOW_JOB_AREA_DETAILS = 'SHOW_JOB_AREA_DETAILS';

export const showJobAreaDetails = (
  jobAreaId: string,
  employees: RenderTree[]
): ActionCreator => {
  const { companyDetails } = store.getState();

  const projectsInJobArea: RenderTree[] = companyDetails.projects.reduce(
    (acc, curr) => {
      const totalProjects = employees.filter((e) =>
        curr.employeesId.includes(e.id)
      );

      return [...acc, ...totalProjects];
    },
    []
  );

  return {
    type: SHOW_JOB_AREA_DETAILS,
    payload: {
      id: jobAreaId,
      totalEmployees: employees.length,
      totalProjects: projectsInJobArea.length,
    },
  };
};

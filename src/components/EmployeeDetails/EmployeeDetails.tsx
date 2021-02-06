import React, { useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Typography } from '@material-ui/core';
import { format } from 'date-fns';

import { RootState } from '../../reducers';
import { TreeNodeType } from '../../common/generic.types';

const mapStateToProps = (state: RootState) => ({
  employeeDetails: state.employeeDetails,
  detailsViewType: state.detailsView.viewType,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const EmployeeDetails: React.FC<PropsFromRedux> = ({
  employeeDetails,
  detailsViewType,
}) => {
  const shouldShowEmployeeDetails = useMemo(
    () => detailsViewType === TreeNodeType.EMPLOYEE,
    [detailsViewType]
  );

  if (!shouldShowEmployeeDetails) {
    return null;
  }

  return (
    <div>
      <Typography variant='h4' color='primary'>
        {employeeDetails.firstName} {employeeDetails.lastName}
      </Typography>
      <Typography variant='h5' color='error'>
        {employeeDetails.jobType} - {employeeDetails.jobTitle}
      </Typography>
      <Typography variant='h6' display='inline'>
        Date of birth:&nbsp;
      </Typography>
      <Typography variant='h6' display='inline' color='secondary'>{`${format(
        new Date(employeeDetails.dateOfBirth),
        'dd MMM, yyyy'
      )}`}</Typography>

      <div>
        <Typography variant='h6' display='inline'>
          Part of:&nbsp;
        </Typography>

        {employeeDetails.projects?.length > 0 ? (
          <ul>
            {employeeDetails.projects?.map((projectName) => (
              <li key={projectName}>{projectName}</li>
            ))}
          </ul>
        ) : (
          <Typography variant='h6' display='inline' color='textSecondary'>
            no projects
          </Typography>
        )}
      </div>
    </div>
  );
};

export default connector(EmployeeDetails);

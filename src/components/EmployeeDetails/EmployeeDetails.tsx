import { Typography } from '@material-ui/core';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { format } from 'date-fns';

import { RootState } from '../../reducers';

const mapStateToProps = (state: RootState) => ({
  employeeDetails: state.employeeDetails,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const EmployeeDetails: React.FC<PropsFromRedux> = ({ employeeDetails }) => {
  if (!employeeDetails.id) {
    return null;
  }

  return (
    <div>
      <Typography variant='h5' color='primary'>
        {employeeDetails.firstName} {employeeDetails.lastName}
      </Typography>
      <Typography variant='body1' color='error'>
        {employeeDetails.jobType} - {employeeDetails.jobTitle}
      </Typography>
      <Typography variant='body1' display='inline'>
        Date of birth:&nbsp;
      </Typography>
      <Typography variant='body1' display='inline'>{`${format(
        new Date(employeeDetails.dateOfBirth),
        'dd MMM, yyyy'
      )}`}</Typography>
      <Typography variant='body1'>Part of:</Typography>
      {employeeDetails.projects?.length > 0 ? (
        <ul>
          {employeeDetails.projects?.map((projectName) => (
            <li key={projectName}>{projectName}</li>
          ))}
        </ul>
      ) : (
        <Typography variant='body1' display='inline'>
          N/A
        </Typography>
      )}
    </div>
  );
};

export default connector(EmployeeDetails);

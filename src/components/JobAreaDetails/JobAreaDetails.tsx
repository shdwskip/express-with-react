import React, { useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Typography } from '@material-ui/core';

import { RootState } from '../../reducers';
import { TreeNodeType } from '../../common/generic.types';

const mapStateToProps = (state: RootState) => ({
  jobAreaDetails: state.jobAreaDetails,
  detailsViewType: state.detailsView.viewType,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const JobAreaDetails: React.FC<PropsFromRedux> = ({
  jobAreaDetails,
  detailsViewType,
}) => {
  const shouldShowJobAreaDetails = useMemo(
    () => detailsViewType === TreeNodeType.JOBAREA,
    [detailsViewType]
  );

  if (!shouldShowJobAreaDetails) {
    return null;
  }

  return (
    <div>
      <div>
        <Typography variant='h5' color='primary' display='inline'>
          Total employees:&nbsp;
        </Typography>
        <Typography variant='h6' display='inline'>
          {jobAreaDetails.totalEmployees}
        </Typography>
      </div>

      <Typography variant='h5' color='error' display='inline'>
        Total projects:&nbsp;
      </Typography>
      <Typography variant='h6' display='inline'>
        {jobAreaDetails.totalProjects}
      </Typography>
    </div>
  );
};

export default connector(JobAreaDetails);

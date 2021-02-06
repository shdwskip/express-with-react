import React, { useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

import { ProjectDetails } from '../';
import { RootState } from '../../reducers';
import { selectProject } from '../../actions';
import { TreeNodeType } from '../../common/generic.types';
import useStyles from './CompanyDetails.styles';

const mapStateToProps = (state: RootState) => ({
  companyDetails: state.companyDetails,
  selectedProject: state.projectDetails,
  detailsViewType: state.detailsView.viewType,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      selectProject,
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const CompanyDetails: React.FC<PropsFromRedux> = ({
  companyDetails,
  selectedProject,
  detailsViewType,
  selectProject,
}) => {
  const classes = useStyles();

  const shouldShowCompanyDetails = useMemo(
    () => detailsViewType === TreeNodeType.COMPANY,
    [detailsViewType]
  );

  if (!shouldShowCompanyDetails) {
    return null;
  }

  return (
    <Grid container>
      <Typography variant='h5' display='inline'>
        Slogan:&nbsp;
      </Typography>
      <Typography variant='h5' className={classes.slogan} color='secondary'>
        {companyDetails.slogan}
      </Typography>

      <Grid container item>
        <Typography variant='h6' color='primary'>
          Address:&nbsp;
        </Typography>
      </Grid>

      <Grid container className={classes.addressContainer}>
        <Grid item>
          <Typography variant='body2'>
            {companyDetails.address.street},
          </Typography>

          <Typography variant='body2'>
            {companyDetails.address.city},
          </Typography>

          <Typography variant='body2'>
            {companyDetails.address.state},
          </Typography>

          <Typography variant='body2'>
            {companyDetails.address.country}
          </Typography>
        </Grid>
      </Grid>

      {companyDetails.projects.length > 0 && (
        <Grid container>
          <Grid container item direction='column'>
            <Grid item>
              <Typography gutterBottom variant='h6' color='secondary'>
                Projects:
              </Typography>
            </Grid>

            <Grid container item spacing={3}>
              <Grid item>
                <List>
                  {companyDetails.projects.map((project) => (
                    <ListItem
                      key={project.id}
                      button
                      disableGutters
                      divider
                      className={classes.listItem}
                      onClick={() => selectProject(project)}
                      selected={selectedProject.id === project.id}
                    >
                      <ListItemIcon>
                        <BusinessCenterIcon />
                      </ListItemIcon>
                      <ListItemText primary={project.name} />
                    </ListItem>
                  ))}
                </List>
              </Grid>

              <Grid item xs={9}>
                {selectedProject.id && (
                  <ProjectDetails
                    data={selectedProject}
                    companyEmployees={companyDetails.employees}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default connector(CompanyDetails);

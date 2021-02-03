import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

import { RootState } from '../../reducers';
import useStyles from './Details.styles';

const mapStateToProps = (state: RootState) => ({
  companyDetails: state.companyDetails,
});

// const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
//   bindActionCreators(
//     {
//       getNavgiationNodes,
//       getCompanyDetails,
//     },
//     dispatch
//   );

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Details: React.FC<PropsFromRedux> = ({ companyDetails }) => {
  const classes = useStyles();

  if (!companyDetails.id) {
    return null;
  }

  return (
    <Grid container>
      <Typography variant='h5' className={classes.slogan}>
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
        <Grid container direction='column'>
          <Grid item>
            <Typography gutterBottom variant='h6' color='secondary'>
              Projects:
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <List>
              {companyDetails.projects.map((project) => (
                <ListItem key={project.id} button>
                  <ListItemIcon>
                    <BusinessCenterIcon />
                  </ListItemIcon>
                  <ListItemText primary={project.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default connector(Details);

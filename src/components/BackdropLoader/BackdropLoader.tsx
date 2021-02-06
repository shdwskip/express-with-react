import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Backdrop, CircularProgress } from '@material-ui/core';

import { RootState } from '../../reducers';
import useStyles from './BackdropLoader.styles';

const mapStateToProps = (state: RootState) => ({
  isLoading: state.loader.isLoading,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const BackdropLoader: React.FC<PropsFromRedux> = ({ isLoading }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <CircularProgress color='primary' />
    </Backdrop>
  );
};

export default connector(BackdropLoader);

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  backdrop: {
    position: 'absolute',
    zIndex: 1201, // by default Material UI drawer has z-index of 1200 so we want the loader to be above it
  },
}));

export default useStyles;

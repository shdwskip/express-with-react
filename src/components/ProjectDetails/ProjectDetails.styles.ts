import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2, 2, 0),
    backgroundColor: theme.palette.background.default,
    height: 300,
  },
  fullHeight: {
    height: '100%',
  },
}));

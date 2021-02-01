import { makeStyles } from '@material-ui/core';

export const DRAWER_WIDTH = '22%';

export default makeStyles(() => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    padding: 20,
  },
}));

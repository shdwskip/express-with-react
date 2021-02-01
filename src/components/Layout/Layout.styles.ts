import { createStyles, makeStyles, Theme } from '@material-ui/core';

import { DRAWER_WIDTH } from '../Drawer/Drawer.styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${DRAWER_WIDTH})`,
      marginLeft: DRAWER_WIDTH,
    },
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  })
);

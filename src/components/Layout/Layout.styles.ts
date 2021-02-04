import { createStyles, makeStyles, Theme } from '@material-ui/core';

import { DRAWER_WIDTH } from '../Drawer/Drawer.styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      minHeight: 800,
    },
    appBar: {
      width: `calc(100% - ${DRAWER_WIDTH})`,
      marginLeft: DRAWER_WIDTH,
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      margin: 0,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3, 5),
    },
  })
);

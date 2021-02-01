import React from 'react';
import { Drawer as MuiDrawer } from '@material-ui/core';

import { Navigation } from '../';
import useStyles from './Drawer.styles';

const Drawer: React.FC = () => {
  const classes = useStyles();

  return (
    <MuiDrawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor='left'
    >
      <Navigation />
    </MuiDrawer>
  );
};

export default Drawer;

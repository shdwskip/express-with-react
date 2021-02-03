import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { Drawer, Details } from '../';

import useStyles from './Layout.styles';

const Layout: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Typography variant='h6' noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer />

      <Container component='main' className={classes.content}>
        <div className={classes.toolbar} />
        <Details />
      </Container>
    </div>
  );
};

export default Layout;
import React from 'react';
import { Grid } from '@material-ui/core';

import { Layout } from './components';

const App: React.FC = () => {
  return (
    <Grid container className='App'>
      <Layout />
    </Grid>
  );
};

export default App;

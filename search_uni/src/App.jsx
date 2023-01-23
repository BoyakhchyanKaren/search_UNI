import * as React from 'react';
import { Grid, useTheme } from '@mui/material';
import SearchSection from './components/SearchSection/Search';
import Header from './components/Header/Header';

const App = () => {
  const theme = useTheme();
  return (
    <Grid sx={{
      width: '100vw',
      height: '100vh',
      backgroundColor: theme.palette.primary.light
    }}>
      <Grid
        item
        container
        direction="column"
        justify-content="center"
        alignItems="center"
        gap={4}
      >
        <Header />
        <SearchSection />
      </Grid>
    </Grid>
  );
};


export default App;
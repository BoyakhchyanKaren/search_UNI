import * as React from 'react';
import { Grid, useTheme } from '@mui/material';
import SearchSection from './SearchSection/Search';
import Header from './Header/Header';
import MainCard from './MainCard';

const Main = () => {
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
                <MainCard />
            </Grid>
        </Grid>
    )
};

export default Main;
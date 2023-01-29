import * as React from 'react';
import { Grid, useTheme } from '@mui/material';
import Header from '../Header/Header';
import { CreateSection } from './CreateSection';

export const Create = () => {
    const theme = useTheme();

    return (
        (
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
                    <CreateSection />
                </Grid>
            </Grid>
        )
    )
};
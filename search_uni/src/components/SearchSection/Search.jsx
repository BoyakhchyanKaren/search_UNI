import React, { useState } from 'react';
import { Avatar, Box, Card, Grid, InputAdornment, OutlinedInput, Popper, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';
import { IconSearch } from '@tabler/icons';
import Transitions from '../../Transitions';
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';
import { margins, paddings } from '../../themes/themeConstants';

const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
    zIndex: 1100,
    width: '99%',
    top: '-55px',
    padding: `${paddings.topBottom0} ${paddings.leftRight12}`,
    [theme.breakpoints.down('sm')]: {
        padding: `${paddings.topBottom0} ${paddings.leftRight12}`
    }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    marginLeft: margins.left16,
    paddingLeft: paddings.left16,
    paddingRight: paddings.right16,
    '& input': {
        background: 'transparent',
        paddingLeft: paddings.left4
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: margins.left4,
        background: theme.palette.common.white
    }
}));

const HeaderAvatarStyle = styled(Avatar)(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    overflow: 'hidden',
    transition: 'all .2s ease-in-out',
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary.light
    }
}));


const MobileSearch = ({ value, setValue }) => {
    const theme = useTheme();

    return (
        <OutlineInputStyle
            id="input-search-header"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search"
            startAdornment={
                <InputAdornment position="start">
                    <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                </InputAdornment>
            }
            aria-describedby="search-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
        />
    );
};

const SearchSection = () => {
    const theme = useTheme();
    const [value, setValue] = useState('');

    return (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                        <>
                            <Box sx={{ ml: 2 }}>
                                <HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
                                    <IconSearch stroke={1.5} size="1.2rem" />
                                </HeaderAvatarStyle>
                            </Box>
                            <PopperStyle {...bindPopper(popupState)} transition>
                                {({ TransitionProps }) => (
                                    <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: 'center left' }}>
                                        <Card
                                            sx={{
                                                background: theme.palette.common.white,
                                                [theme.breakpoints.down('sm')]: {
                                                    border: 0,
                                                    boxShadow: 'none'
                                                }
                                            }}
                                        >
                                            <Box sx={{ p: 2 }}>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item xs>
                                                        <MobileSearch value={value} setValue={setValue} />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Card>
                                    </Transitions>
                                )}
                            </PopperStyle>
                        </>
                    )}
                </PopupState>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <OutlineInputStyle
                    id="input-search-header"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search"
                    startAdornment={
                        <InputAdornment position="start">
                            <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                        </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{ 'aria-label': 'weight' }}
                />
            </Box>
        </>
    );
};

export default SearchSection;

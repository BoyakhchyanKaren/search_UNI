import React, { useMemo } from 'react';
// material-ui
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import defaultConfig from './config';

import componentStyleOverrides from './compStyleOverride';
import Palette from './palette';
import customShadows from './shadows';
import { paddings } from './themeConstants';
import Typography from './typography';


const stylesConfig = {
  ...defaultConfig
};

export default ({ children }) => {
  const { borderRadius, fontFamily, navType, outlinedFilled, presetColor, rtlLayout } = stylesConfig;

  const theme = useMemo(() => Palette(navType, presetColor), [navType, presetColor]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const themeTypography = useMemo(
    () => Typography(theme, borderRadius, fontFamily),
    [theme, borderRadius, fontFamily]
  );
  const themeCustomShadows = useMemo(
    () => customShadows(navType, theme),
    [navType, theme]
  );

  const themeOptions = useMemo(
    () => ({
      direction: rtlLayout ? 'rtl' : 'ltr',
      palette: theme.palette,
      mixins: {
        toolbar: {
          minHeight: '48px',
          padding: paddings.all16,
          '@media (min-width: 600px)': {
            minHeight: '48px'
          }
        }
      },
      typography: themeTypography,
      customShadows: themeCustomShadows
    }),
    [rtlLayout, theme, themeCustomShadows, themeTypography]
  );

  const themes = createTheme(themeOptions);

  themes.components = useMemo(
    () => componentStyleOverrides(themes, borderRadius, outlinedFilled),
    [themes, borderRadius, outlinedFilled]
  );

  return (
    <ThemeProvider theme={themes}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

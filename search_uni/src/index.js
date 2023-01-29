import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import ThemeCustomization from './themes';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ArticlesContextProvider from './context';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <ArticlesContextProvider>
    <ThemeCustomization>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </ThemeCustomization>
  </ArticlesContextProvider>
);
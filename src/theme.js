import {createTheme } from '@mui/material/styles';

export const theme= createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1b5e20',
    },
    secondary: {
      main: 'rgba(92,71,63,0.65)',
    },
    error: {
      main: '#e63946',
    },
  },
  typography: {
    fontWeightLight: 300,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      fontFamily: 'Merriweather',
    },
    body1: {
      fontFamily: 'Merriweather Sans',
      fontSize: 14,
      fontWeight: 100,
    },
    body2: {
      fontFamily: 'Merriweather Sans',
      lineHeight: 1.5,
      fontSize: '0.8rem',
    },
    h5: {
      lineHeight: 0.97,
      fontFamily: 'Merriweather Sans',
      fontWeight: 100,
    },
    h6: {
      lineHeight: 1.12,
    },
    h2: {
      fontFamily: 'Merriweather',
    },
    h3: {
      fontFamily: 'Merriweather',
    },
    h4: {
      fontFamily: 'Merriweather',
      fontWeight: 100,
    },
    subtitle2: {
      fontFamily: 'Merriweather Sans',
    },
    button: {
      fontFamily: 'Merriweather Sans',
    },
    caption: {
      fontFamily: 'Merriweather Sans',
    },
    overline: {
      fontFamily: 'Merriweather Sans',
    },
  },
});

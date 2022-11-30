import {createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
      type: 'light',
      background: {
        default: '#f3f3f3'
      },
      primary: {
        main: '#1D3557',
      },
      secondary: {
        main: '#da711f',
      },
      error: {
        main: '#e63946',
      },
    },
    typography: {
      fontWeightLight: 300,
      fontWeightBold: 700,
      fontFamily: 'Raleway',
      h1: {
        fontWeight: 700,
      },
      body1: {
        fontFamily: 'Merriweather',
      },
      body2: {
        fontFamily: 'Merriweather',
        lineHeight: 1.63,
        fontSize: '0.8rem',
      },
      h5: {
        lineHeight: 0.97,
      },
      h6: {
        lineHeight: 1.12,
      },
    },
  })


// component import
import CreateProject from '../CreateProject/CreateProject';
import DisplayProjects from '../DisplayProjects/DisplayProjects';
import Nav from '../Nav/Nav';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    type: 'light',
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <main>
        <CreateProject />
        <DisplayProjects />
      </main>
    </ThemeProvider>
  );
}

export default App;

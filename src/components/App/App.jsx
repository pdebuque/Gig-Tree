// react router
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';


// component import
import Home from '../Home/Home'
import CreateProject from '../CreateProject/CreateProject';
import DisplayProjects from '../DisplayProjects/DisplayProjects';
import Nav from '../Nav/Nav';
import './App.css';

//styles
import { ThemeProvider } from '@mui/material/styles'

import { theme } from '../../theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Router>
        <Routes>
          <Route exact path='/' element = {<Home/>}></Route>
          <Route exact path='/create' element = {<CreateProject/>}> </Route>
          <Route exact path='/display' element = {<DisplayProjects />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

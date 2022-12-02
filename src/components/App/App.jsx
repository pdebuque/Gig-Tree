// react router
import { Routes, Route } from 'react-router-dom';

// component import
import Home from '../Home/Home'
import CreateProject from '../CreateProject/CreateProject';
import DisplayProjects from '../DisplayProjects/DisplayProjects';
import Nav from '../Nav/Nav';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import About from '../About/About';
import './App.css';

//styles
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path = '/profile' element = {<Profile />}></Route> 
        <Route path='/create' element={<CreateProject />}> </Route>
        <Route path='/display' element={<DisplayProjects />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/about' element = {<About />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

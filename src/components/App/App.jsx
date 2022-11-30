// react router
import { Routes, Route } from 'react-router-dom';


// component import
import Home from '../Home/Home'
import CreateProject from '../CreateProject/CreateProject';
import DisplayProjects from '../DisplayProjects/DisplayProjects';
import Nav from '../Nav/Nav';
import Profile from '../Profile/Profile'
import Login from '../Login/Login';
import './App.css';

//styles
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path = '/profile' element = {<Profile />}></Route> 
        <Route exact path='/create' element={<CreateProject />}> </Route>
        <Route exact path='/display' element={<DisplayProjects />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

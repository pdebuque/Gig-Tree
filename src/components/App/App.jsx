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

// temporary info
import { users } from '../../temp-info'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      {/* <main className='main-content'> */}
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Home />}></Route>

        {/* create use profiles
        //todo: use route params instead of map to get the user info
        */}
        {users.map(user => {
          return (
            <Route key={user.id} path={`/${user.name.toLowerCase().split(' ').join('-')}`} element={<Profile user={user} />}></Route>
          )
        })}
        {/* <Route path = '/profile' element = {<Profile />}></Route>  */}
        <Route path='/create' element={<CreateProject />}> </Route>
        <Route path='/display' element={<DisplayProjects />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/about' element={<About />}></Route>
      </Routes>
      {/* </main> */}
    </ThemeProvider>
  );
}

export default App;

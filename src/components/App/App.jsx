// react stuff
import { useEffect } from 'react'

// react router
import { Routes, Route } from 'react-router-dom';

// redux stuff
import { useDispatch, useSelector } from 'react-redux'

// component import
import Home from '../Home/Home'
import CreateProject from '../CreateProject/CreateProject';
import DisplayProjects from '../DisplayProjects/DisplayProjects';
import Nav from '../Nav/Nav';
import Profile from '../Profile/Profile';
import LoginPage from '../LoginPage/LoginPage';
import About from '../About/About';
import Dashboard from '../Dashboard/Dashboard';
import Register from '../Register/Register'


import './App.css';

//styles
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';

// temporary info
import { users } from '../../temp-info'

function App() {

  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' })
  }, [dispatch])


  return (
    <ThemeProvider theme={theme}>
      <Nav />
      {/* <main className='main-content'> */}
      <Routes>
        <Route path='/about' element={<About />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path = '/register' element = {<Register/>}></Route>

        {/* protected routes: only dashboard (for now) */}

        <Route path='/dashboard' element={user.id ? <Dashboard /> : <LoginPage />}></Route>

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
        <Route path='/login' element={<LoginPage />}></Route>
        <Route element={<h1>404</h1>}></Route>
      </Routes>
      {/* 
      //todo: make a <Footer/> element
      */}
      {/* </main> */}
    </ThemeProvider>
  );
}

export default App;

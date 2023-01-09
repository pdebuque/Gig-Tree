// react stuff
import { useEffect } from 'react'

// react router
import { Routes, Route, redirect } from 'react-router-dom';

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
import Register from '../Register/Register';
import ProjectPage from '../ProjectPage/ProjectPage'


import './App.css';

//styles
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';

// temporary info
// import { users } from '../../temp-info'

function App() {

  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  useEffect(() => {
    console.log('fetching user from app.jsx')
    dispatch({ type: 'FETCH_USER' })
  }, [dispatch])


  return (
    <ThemeProvider theme={theme}>
      <Nav />
      {/* <main className='main-content'> */}
      <Routes>
        <Route path='/about' element={<About />}/>
        <Route path='/' element={<Home />}/>
        <Route path = '/register' element = {<Register/>}/>

        {/* protected routes: only dashboard (for now) */}

        <Route path='/dashboard' element={user.id ? <Dashboard /> : <LoginPage />}/>

        <Route path = 'project/:projectId' element = {<ProjectPage />} />
        {/* create use profiles
        //todo: use route params instead of map to get the user info
        */}
        {/* {users.map(user => {
          return (
            <Route key={user.id} path={`/${user.name.toLowerCase().split(' ').join('-')}`} element={<Profile user={user} />}/>
          )
        })} */}
        {/* <Route path = '/profile' element = {<Profile />}></Route>  */}
        <Route path='/create' element={<CreateProject />}/> 
        <Route path='/display' element={<DisplayProjects />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route element={<h1>404</h1>}/>
      </Routes>
      {/* 
      //todo: make a <Footer/> element
      */}
      {/* </main> */}
    </ThemeProvider>
  );
}

export default App;

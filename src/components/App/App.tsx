import { useEffect } from 'react'

// library - functions
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

// library - components
import { ThemeProvider } from '@mui/material/styles';

// internal - componenets
import Nav from '../Nav/Nav';
import LoginPage from '../pages/LoginPage/LoginPage';
import About from '../pages/About/About';
import Dashboard from '../pages/Dashboard/Dashboard';
import Register from '../Register/Register';
import ProjectPage from '../pages/ProjectPage/ProjectPage'

// internal - other
import './App.css';
import { theme } from '../../theme';

import {RootState} from '../../redux/reducers/_root.reducer'

function App() {

  const dispatch = useDispatch();
  const user = useSelector((store: RootState) => store.user);

  useEffect(() => {
    console.log('fetching user from app.jsx')
    dispatch({ type: 'FETCH_USER' })
  }, [dispatch])


  return (
    <ThemeProvider theme={theme}>
      <Nav />
      {/* <main className='main-content'> */}
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/' element={user.id ? <Navigate replace to="/dashboard" /> : <LoginPage />} />
        <Route path='/register' element={<Register />} />

        {/* protected routes: only dashboard (for now) */}

        <Route path='/dashboard' element={user.id ? <Dashboard /> : <LoginPage />} />
        <Route path='project/:projectId' element={user.id ? <ProjectPage /> : <LoginPage />} />

        {/* <Route path='/create' element={<CreateProject />}/> 
        <Route path='/display' element={<DisplayProjects />}/> */}
        <Route path='/login' element={<LoginPage />} />
        <Route element={<h1>404</h1>} />
      </Routes>
      {/* 
      //todo: make a <Footer/> element
      */}
      {/* </main> */}
    </ThemeProvider>
  );
}

export default App;

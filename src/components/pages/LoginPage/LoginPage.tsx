import { Paper, Typography, TextField, Button, Box } from '@mui/material'
import { loginStyle, formStyle, } from '../../../_style/loginStyle';

import { useNavigate } from 'react-router-dom'

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// model
import { RootState } from '../../../redux/reducers/_root.reducer';

export default function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store:RootState) => store.errors);
  const dispatch = useDispatch();

  const login = (e:React.FormEvent<HTMLFormElement>) => {
    console.log('logging in user: ', username)
    e.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
      // if login is successful, move the user to their dashboard
      navigate('/dashboard')
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }

  const demoLogin = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: 'demo',
          password: 'password',
        }
      });

      navigate('/dashboard')
    } catch (error) {
      dispatch({ type: 'LOGIN_INPUT_ERROR' })
    }

  }

  return (
    <Paper sx={loginStyle}>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Box
        component='form'
        className='login-form'
        onSubmit={login}
        sx={formStyle}
      >
        <Typography style={{ textAlign: 'center', width: 300 }} variant='h3' sx={{ mb: 2 }}>Welcome to Gig Tree</Typography>
        <Box>
          <TextField
            size="small"
            sx={{ width: 150, marginX: 'auto', marginY: 1 }}
            label='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /></Box>
        <Box>
          <TextField
            size="small"
            sx={{ width: 150, marginX: 'auto', marginY: 1 }}
            label='password'
            value={password}
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          /></Box>
        <Box sx={{ mt: 2 }}>
          <Button onClick={() => navigate('/register')}>register</Button>
          <Button type='submit'>log in</Button>
        </Box>
        <Box>
          <Button onClick={demoLogin}>demo (no login)</Button>
        </Box>
      </Box>
    </Paper>

  )
}

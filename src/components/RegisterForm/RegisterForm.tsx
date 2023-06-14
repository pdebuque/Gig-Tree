import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextField, Paper, Box, Typography, Button } from '@mui/material';
import { loginStyle, formStyle } from '../../_style/loginStyle'

//todo: feedback for successful register

// model
import { RootState } from '../../redux/reducers/_root.reducer';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store:RootState) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('registering user: ', username, password)

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Container>
      <Paper sx={loginStyle}>
        <Box
          component='form'
          sx={formStyle}
          className="formPanel"
          onSubmit={registerUser}>
          <Typography variant='h3'>Welcome!</Typography>
          <Typography textAlign='center' variant='body1'>enter a username and password to create your account</Typography>
          {errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {errors.registrationMessage}
            </h3>
          )}
          <Box>
            <TextField
              type="text"
              name="username"
              size='small'
              label='username'
              value={username}
              sx={{ width: 150, marginX: 'auto', marginY: 1 }}
              required
              onChange={(event) => setUsername(event.target.value)}

            />
          </Box>
          <Box>
            <TextField
              type="password"
              label='password'
              name="password"
              size='small'
              value={password}
              sx={{ width: 150, marginX: 'auto', marginY: 1 }}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </Box>
          <Button type='submit'>Register</Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default RegisterForm;

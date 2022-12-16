import { Paper, Typography, TextField, Button, Box } from '@mui/material'
import { loginStyle, inputStyle, buttonStyle } from './loginStyle';

import {useNavigate} from 'react-router-dom'


export default function Login() {

  const navigate = useNavigate();

  return (
    <Paper style={loginStyle}>
      <Typography variant='h3' sx={{mb: 2}}>Welcome to Gig Tree</Typography>
      <TextField
        size="small"
        sx={{ width: 150, marginX: 'auto', marginY: 1 }}
        label='username'
      />
      <TextField
        size="small"
        sx={{ width: 150, marginX: 'auto', marginY: 1 }}
        label='password'
      />
      <Box sx={{mt: 2}}>
        <Button onClick={()=>navigate('/register')}>register</Button>
        <Button>log in</Button>
      </Box>
    </Paper>

  )
}
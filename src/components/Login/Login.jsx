import { Paper, Typography, TextField, Button, Box } from '@mui/material'
import { loginStyle, inputStyle, buttonStyle } from './loginStyle'


export default function Login() {
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
        <Button>register</Button>
        <Button>log in</Button>
      </Box>
    </Paper>

  )
}
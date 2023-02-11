import { Button, AppBar, Box, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

export default function Nav() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector(store => store.user)

  const handleLogout = () => {
    dispatch({type: 'LOGOUT'})
    navigate('/login');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h4" color="inherit" sx={{ textDecoration: 'none', flexGrow: 1 }}>
            gig tree
          </Typography>
          <Button color="inherit" onClick={() => navigate('/about')} sx ={{textTransform: 'none'}}>about</Button>
          <Button sx = {{textTransform: 'none'}} color="inherit" onClick={handleLogout}>logout</Button>

          {/* //todo: icon destination and source come from database, depending on user */}
          <IconButton onClick={() => navigate('/dashboard')}>
            <Avatar size={16} alt={`${user.first_name}'sprofile picture`} src={user.prof_pic_path} />
          </IconButton>
          {/* <Button component = "avatar" src='images/prof-pics/Paolo-prof-pic.png' color="inherit" onClick={() => navigate('/login')}/> */}
        </Toolbar>
      </AppBar>

    </Box>
  )
}
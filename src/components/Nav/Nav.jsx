import { Button, AppBar, Box, Toolbar, Link, Typography, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { useState } from 'react';

export default function Nav() {

  const navigate = useNavigate();

  const [openSidebar, setOpen] = useState(false);

  const toggleSidebar = () => {
    console.log('in toggleSidebar');
    setOpen(!openSidebar);
  }

  const handleLogout = () =>{
    console.log('logout here');         //todo: modal popout for logout information
    navigate('/login') 
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>
            <Typography component='a' href='/' variant="h4" color="inherit" sx={{ textDecoration: 'none', flexGrow: 1 }}>
              Gig Tree
            </Typography>
          <Button color="inherit" onClick={() => navigate('/about')}>About</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
          <IconButton onClick={()=>navigate('/paolo-debuque')}>
            <Avatar size={16} alt="Paolo's profile picture" src="images/prof-pics/Paolo-prof-pic.png"/>
          </IconButton>
          {/* <Button component = "avatar" src='images/prof-pics/Paolo-prof-pic.png' color="inherit" onClick={() => navigate('/login')}/> */}
        </Toolbar>
      </AppBar>
      <Sidebar
        openSidebar={openSidebar}
        setOpen={setOpen}
      />
    </Box>
  )
}
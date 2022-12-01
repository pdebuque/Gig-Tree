import { Button, AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { useState } from 'react';

export default function Nav() {

    const navigate = useNavigate();

    const [openSidebar, setOpen] = useState(false)
    const toggleSidebar = () => {
        console.log('in toggleSidebar');
        setOpen(!openSidebar);
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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Gig manager
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/profile')}>My Profile</Button>
                    <Button color="inherit" onClick={() => navigate('/create')}>Create Project</Button>
                    <Button color="inherit" onClick={() => navigate('/display')}>My Projects</Button>
                    <Button color="inherit" onClick={() => navigate('/about')}>About</Button>
                    <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                </Toolbar>
            </AppBar>
            <Sidebar
                openSidebar={openSidebar}
            />
        </Box>
    )
}
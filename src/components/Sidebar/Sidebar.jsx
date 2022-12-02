import { Button, Drawer } from '@mui/material';
import * as React from 'react';
import {useNavigate} from 'react-router-dom'


export default function Sidebar({ openSidebar, setOpen }) {

const navigate=useNavigate();
const clickCreate = () =>{
    navigate('/create');
    setOpen(!openSidebar)
}
const clickProjects = () =>{
    navigate('/display');
    setOpen(!openSidebar)
}

    return (
        <div>
            <Drawer
                anchor='left'
                open={openSidebar}>
                
                <Button color="inherit" onClick={clickCreate}>Create Project</Button>
                    <Button color="inherit" onClick={clickProjects}>My Projects</Button>
                <Button onClick={()=>setOpen(!openSidebar)}>x</Button>
            </Drawer>
        </div>
    )

}
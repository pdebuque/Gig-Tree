/* 
this component is the projects sidebar in the dashboard.

it will get all of the projects that user is on and that user owns from the server and map them into individual project components
*/
import {insetStyle} from '../../_style/projectStyle'
import DashboardProjectItem from '../DashboardProjectItem/DashboardProjectItem'

import {useSelector, useDispatch} from 'react-redux';
import {Box, Typography} from '@mui/material';
import {useEffect} from 'react'


export default function DashboardProjects() {

// get the user's projects from the store

const dispatch = useDispatch();
useEffect(()=>{
  console.log('getting user projects in dashboard');
  dispatch({type: 'GET_PROJECTS'});
},[])

const projects = useSelector(store=>store.project)

  return(
    <Box >
      {JSON.stringify(projects[0])}
      <Typography variant='h5'>Projects</Typography>
      <Box sx={insetStyle}>
      {projects.map(project=>{
        return(
          <DashboardProjectItem key={project.id} project={project}/>
        )
      })}
      </Box>
    </Box>
  )
}
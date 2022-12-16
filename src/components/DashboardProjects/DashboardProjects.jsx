/* 
this component is the projects sidebar in the dashboard.

it will get all of the user's projects from the server and map them into individual project components
*/

import DashboardProjectItem from '../DashboardProjectItem/DashboardProjectItem'

import {useSelector} from 'react-redux';



import {Box, Typography} from '@mui/material'



export default function DashboardProjects() {

const projects = useSelector(store=>store.project)

  return(
    <Box>
      <Typography variant='h5'>Projects</Typography>
      {projects.map(project=>{
        return(
          <DashboardProjectItem key={project.id} project={project}/>
        )
      })}
    </Box>
  )
}
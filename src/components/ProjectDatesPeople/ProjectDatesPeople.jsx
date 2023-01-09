import { useSelector } from 'react-redux';
import { Box, Typography, Paper } from '@mui/material'

export default function ProjectDatesPeople() {

  const project = useSelector(store => store.currentProject)

  return (
    <Paper sx = {{p: 2, height: 600}}>
    
        {project.dates.map(date=>{
          return (
            <Box>
            {JSON.stringify(date)}
            </Box>
          )
        })}

        {project.collaborators.map(collab=>{
          return(
            <Box>
              {JSON.stringify(collab)}
              </Box>
          )
        })}

    </Paper>
  )
}
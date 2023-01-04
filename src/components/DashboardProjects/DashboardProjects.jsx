/* 
this component is the projects sidebar in the dashboard.

it will get all of the projects that user is on and that user owns from the server and map them into individual project components
*/
import { insetStyle } from '../../_style/projectStyle'
import DashboardProjectItem from '../DashboardProjectItem/DashboardProjectItem';
import DeleteProjectModal from '../DeleteProjectModal/DeleteProjectModal'
import CreateProject from '../CreateProject/CreateProject';

import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, IconButton, Modal, Container, Button } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useEffect, useState } from 'react';
import { largeModal } from '../../_style/modalStyle'

export default function DashboardProjects() {

  // get the user's projects from the store

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('getting user projects in dashboard');
    dispatch({ type: 'GET_PROJECTS' });
  }, [])

  const projects = useSelector(store => store.project)
  const [createOpen, setCreateOpen] = useState(false)

  // this dictates create or edit mode of the entire project creation modal
  const [createMode, setCreateMode] = useState(true)

  return (
    <Container >
      <Typography variant='h5'>
        Projects
        <IconButton
          aria-label="add-project"
          onClick={() => {
            setCreateMode(true)
            setCreateOpen(true)
            }}>
          <ControlPointIcon />
        </IconButton>
      </Typography>
      <Box sx={insetStyle}>
        {projects.map(project => {
          return (
            <DashboardProjectItem 
              key={project.id} 
              project={project} 
              setCreateOpen = {setCreateOpen} 
              setCreateMode={setCreateMode}
              />
          )
        })}
      </Box>
      <Modal
        open={createOpen}
      >
        <Box sx={largeModal}>
          <CreateProject createMode={createMode} setCreateOpen={setCreateOpen}/>


        </Box>
      </Modal>

      
    </Container>
  )
}
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
import {sortByStarred, sortByFirstAsc, sortByFirstDesc} from '../../modules/sortFunctions'

export default function DashboardProjects() {


  // get the user's projects from the store
  const projects = useSelector(store => store.project);
  const [projectsDisplayed, setProjectsDisplayed] = useState(projects)
  const [createOpen, setCreateOpen] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    setProjectsDisplayed(projects)
  }, [projects])

  useEffect(() => {
    console.log('getting user projects in dashboard');
    dispatch({ type: 'GET_PROJECTS' });
  }, [])

  // this dictates create or edit mode of the entire project creation modal
  const [createMode, setCreateMode] = useState(true)

  return (
    <Container >
      {/* {JSON.stringify(projects)} */}
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
        {projectsDisplayed.map(project => {
          return (
            <DashboardProjectItem
              key={project.id}
              project={project}
              setCreateOpen={setCreateOpen}
              setCreateMode={setCreateMode}
            />
          )
        })}
      </Box>
      <Modal
        open={createOpen}
      >
        <Box sx={largeModal}>
          <CreateProject createMode={createMode} setCreateOpen={setCreateOpen} />
        </Box>
      </Modal>

      <Button onClick={() => setProjectsDisplayed(sortByStarred(projects))}>sort by starred</Button>
      <Button onClick={() => setProjectsDisplayed(sortByFirstAsc(projects))}>sort by date</Button>
      <Button onClick={() => setProjectsDisplayed(sortByFirstDesc(projects))}>sort by date</Button>

    </Container>
  )
}
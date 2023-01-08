/* 
This component is a single project displayed within the dashboard projects sidebar
*/

//todo: item colors
//todo: background colors conditional on date: past-grey; upcoming: light yellow; current: light green

//todo: avatars

//todo: sort by date


import './DashboardProjectItem.css';
import { listItemStyle } from '../../_style/listItemStyle.jsx'
import { Box, Typography, Collapse, Button, IconButton, Modal, Avatar } from '@mui/material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { largeModal } from '../../_style/modalStyle';

import DeleteProjectModal from '../DeleteProjectModal/DeleteProjectModal';


export default function DashboardProjectItem({ project, setCreateOpen, setCreateMode }) {

  const user = useSelector(store => store.user)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCollapsed, setCollapsed] = useState(false)

  // upon clicking edit, load current project info into create project modal
  // dispatch: set the redux new project equal to project
  // need to conditionally render the modal for edit vs create, as well as the functionality accordingly

  const handleEditClick = () => {
    dispatch({ type: 'SET_NEW_PROJECT', payload: project });
    setCreateMode(false);
    setCreateOpen(true);
  }

  const handleDeleteClick = () => {
    setDeleteOpen(true)
  }

  // delete onclick: confirmation modal

  return (
    <Box
      className='project-item'
      sx={{...listItemStyle, borderTop: 10, borderColor: project.backgroundColor}}
      onClick={() => setCollapsed(!isCollapsed)}
      
    >
      <Box sx={{ ml: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx ={{display: 'flex'}}>
          <Typography variant='h6'>{project.name}</Typography>
        </Box>
        {project.owner_id === user.id &&
          <Box>
            <IconButton
              sx={{ width: 20, height: 20 }}
              onClick={handleEditClick}
            ><EditIcon sx={{ width: 16, height: 16 }} /></IconButton>
            <IconButton sx={{ width: 20, height: 20 }}
              onClick={handleDeleteClick}
            ><DeleteIcon sx={{ width: 16, height: 16 }} /></IconButton>
          </Box>
        }
      </Box>
      <Typography variant='subtitle2'>with {project.ensemble_name}</Typography>
      <Collapse
        in={isCollapsed}
      >
        <Box sx={{ ml: 3, pl: 1, marginY: 1, typography: 'body2', borderLeft: 3, borderColor: 'grey.300', backgroundColor: 'grey.50' }}>
          {project.description}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            size='small'
            color='inherit'
            sx={{ textAlign: 'right', typography: 'body2', mr: 1 }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate(`/project/${project.id}`)}
          >view project page</Button>
        </Box>
      </Collapse>
      <Modal
        open={deleteOpen}
      >
        <Box sx={largeModal}>
          <DeleteProjectModal
            setDeleteOpen={setDeleteOpen}
            projectID={project.id}
          />
        </Box>
      </Modal>

    </Box>
  )

}
/* 
This component is a single project displayed within the dashboard projects sidebar
*/

//todo: item colors
//todo: background colors conditional on date: past-grey; upcoming: light yellow; current: light green

//todo: avatars

//todo: sort by date


import './DashboardProjectItem.css';
import { listItemStyle } from '../../_style/listItemStyle.jsx'
import { Box, Typography, Collapse, Button, IconButton, Modal, Avatar, AvatarGroup } from '@mui/material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/Star';
import { smallModal } from '../../_style/modalStyle';
import { placeholderText } from '../../_style/textStyle';

import DeleteProjectModal from '../DeleteProjectModal/DeleteProjectModal';


export default function DashboardProjectItem({ project, setCreateOpen, setCreateMode }) {

  const user = useSelector(store => store.user)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCollapsed, setCollapsed] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // upon clicking edit, load current project info into create project modal
  // dispatch: set the redux new project equal to project
  // need to conditionally render the modal for edit vs create, as well as the functionality accordingly

  const handleEditClick = () => {
    dispatch({ type: 'SET_NEW_PROJECT', payload: project });
    setCreateMode(false);
    setCreateOpen(true);
  }

  const handleDeleteClick = (event) => {
    setMousePos({ x: event.clientX, y: event.clientY })
    setDeleteOpen(true)
  }

  // delete onclick: confirmation modal
  const handleStarClick = (event) => {
    console.log('handling star click')
    if (project.starred) dispatch({ type: 'SET_PROJECT_STARRED', payload: { id: project.id, starred: false } })
    else dispatch({ type: 'SET_PROJECT_STARRED', payload: { id: project.id, starred: true } })
  }

  return (
    <Box
      className='project-item'
      sx={{ ...listItemStyle, borderTop: 10, borderColor: project.backgroundColor }}
    >
      <Box sx={{ ml: 0, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <IconButton
            sx={{ width: 24, height: 24, mr: 1 }}
            onClick={() => setCollapsed(!isCollapsed)}

          >
            <MoreVertIcon sx={{ width: 20, height: 20 }} />
          </IconButton>
          <Box sx={{ display: 'flex' }}>

            {project.name ?
              <Typography variant='h6'>{project.name}</Typography>
              :
              <Typography variant='h6' sx={placeholderText}>unnamed project</Typography>
            }
          </Box>
        </Box>
        {project.owner_id === user.id &&
          <Box sx={{ display: 'flex' }}>
            <IconButton
              sx={{ width: 20, height: 20 }}
              onClick={handleStarClick}
            >

              {project.starred ? <StarIcon sx={{ fill: '#F6F308', width: 16, height: 16 }} /> : <StarBorderIcon sx={{ width: 16, height: 16 }} />}
            </IconButton>
            <IconButton
              sx={{ width: 20, height: 20 }}
              onClick={handleEditClick}

            >
              <EditIcon sx={{ width: 16, height: 16 }} />
            </IconButton>

            <IconButton sx={{ width: 20, height: 20 }}
              onClick={handleDeleteClick}
            >
              <DeleteIcon sx={{ width: 16, height: 16 }} />
            </IconButton>

          </Box>
        }
      </Box>
      <Box sx={{ marginLeft: 4 }}>
        {project.ensemble_name ?
          <Typography variant='subtitle2'>with {project.ensemble_name}</Typography>
          : <Typography variant='subtitle2' sx={placeholderText}>with unnamed ensemble</Typography>
        }</Box>
      <Collapse
        in={isCollapsed}
      >
        <Box sx={{ ml: 5, pl: 1, marginY: 1, typography: 'body2', borderLeft: 3, borderColor: 'grey.300', backgroundColor: 'grey.50' }}>
          {project.description}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

          <AvatarGroup >
            {/* bring in avatars from all collaborators, with owner largest */}
          </AvatarGroup>
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
        <Box sx={{ ...smallModal, top: mousePos.y, left: mousePos.x }}>
          <DeleteProjectModal
            setDeleteOpen={setDeleteOpen}
            projectID={project.id}
          />
        </Box>
      </Modal>

    </Box>
  )

}
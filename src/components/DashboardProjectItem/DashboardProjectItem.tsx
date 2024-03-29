/* 
This component is a single project displayed within the dashboard projects sidebar
*/

// library - functions
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon'

// library - components
import { Box, Typography, Collapse, Button, IconButton, Modal, Avatar, AvatarGroup, Tooltip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/Star';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

// internal - components
import DeleteProjectModal from '../DeleteProjectModal/DeleteProjectModal';

// internal - other
import { listItemStyle } from '../../_style/listItemStyle'
import './DashboardProjectItem.css';
import { smallModal } from '../../_style/modalStyle';
import { placeholderText } from '../../_style/textStyle';

// model
import { RootState } from '../../redux/reducers/_root.reducer'
import { ProjectT } from '../../model'

type Props = {
  project: ProjectT,
  setCreateOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCreateMode: React.Dispatch<React.SetStateAction<boolean>>
}

type Position = {
  x: number,
  y: number
}


export default function DashboardProjectItem({ project, setCreateOpen, setCreateMode }: Props) {

  const user = useSelector((store: RootState) => store.user)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCollapsed, setCollapsed] = useState(false)
  const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 })

  // upon clicking edit, load current project info into create project modal
  // dispatch: set the redux new project equal to project
  // need to conditionally render the modal for edit vs create, as well as the functionality accordingly

  const handleEditClick = () => {
    dispatch({ type: 'SET_NEW_PROJECT', payload: project });
    setCreateMode(false);
    setCreateOpen(true);
  }

  const handleDeleteClick = (event: React.MouseEvent) => {
    setMousePos({ x: event.clientX, y: event.clientY })
    setDeleteOpen(true)
  }

  const handleAcceptClick = () => {
    dispatch({ type: 'ACCEPT_PROJECT', payload: project.id })
  }

  // delete onclick: confirmation modal
  const handleStarClick = (event: React.MouseEvent) => {
    console.log('handling star click')
    if (project.starred) dispatch({ type: 'SET_PROJECT_STARRED', payload: { id: project.id, starred: false } })
    else dispatch({ type: 'SET_PROJECT_STARRED', payload: { id: project.id, starred: true } })
  }

  const now = DateTime.now()
  project.past = now > project.last
  project.upcoming = now < project.first
  project.ongoing = now < project.last && now > project.first

  const getTransform = (position: Position) => {
    // mousePos: [x,y]
    // bottom right corner
    if (position.x > 1200 && position.y > 900) return 'translate(-5%,-5%)';
    // bottom
    if (position.x > 1200) return 'translate(-95%,-105%)';
    // right
    if (position.y > 750) return 'translate(-5%,-105%)';
    // else
    return 'translate(-5%,5%)'
  }

  const owner = project.collaborators.filter((person) => person.id === project.owner_id)
  const notOwner4 = project.collaborators.filter((person) => person.id !== project.owner_id).slice(0, 4)

  return (
    <Box
      className='project-item'
      sx={{ ...listItemStyle, borderTop: 10, borderColor: project.backgroundColor }}
    >
      {/* past? {JSON.stringify(project.past)} / /
      upcoming? {JSON.stringify(project.upcoming)} / /
      ongoing? {JSON.stringify(project.ongoing)} */}
      <Box sx={{ ml: 0, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <IconButton
            sx={{ width: 24, height: 24, mr: 1 }}
            onClick={() => setCollapsed(!isCollapsed)}
            aria-label='view more'
          >
            <MoreVertIcon sx={{ width: 20, height: 20 }} />
          </IconButton>

          {project.name ?
            <Typography variant='h6'>{project.name}</Typography>
            :
            <Typography variant='h6' sx={placeholderText}>unnamed project</Typography>
          }

        </Box>
        <Box sx={{ display: 'flex' }}>
          {project.owner_id === user.id &&

            <>
              <IconButton
                sx={{ width: 20, height: 20 }}
                onClick={handleEditClick}
                aria-label="edit project"
              >
                <EditIcon sx={{ width: 16, height: 16 }} />
              </IconButton>
              <IconButton
                sx={{ width: 20, height: 20 }}
                onClick={handleDeleteClick}
                aria-label="delete project"
              >
                <DeleteIcon sx={{ width: 16, height: 16 }} />
              </IconButton>
            </>

          }

          {project.owner_id !== user.id &&

            <IconButton
              sx={{ width: 20, height: 20 }}
              onClick={handleAcceptClick}
              aria-label={project.accepted ? "turn down project" : "accept project"}
            >
              {/* this pattern is more accessible: the button remains the same; its contents just differ */}
              {project.accepted ?
                <TaskAltIcon sx={{ width: 16, height: 16 }} />
                :
                <RadioButtonUncheckedIcon sx={{ width: 16, height: 16 }} />
              }
            </IconButton>}

          <IconButton
            sx={{ width: 20, height: 20 }}
            onClick={handleStarClick}
            aria-label={project.starred ? "un-star project" : "star project"}
          >

            {project.starred ? <StarIcon sx={{ fill: '#F6F308', width: 16, height: 16 }} /> : <StarBorderIcon sx={{ width: 16, height: 16 }} />}
          </IconButton>

        </Box>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ ml: 2 }}>
            <AvatarGroup spacing='medium'  >
              <Tooltip
                PopperProps={{
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -12],
                      },
                    },
                  ],
                }}
                title={`project owner: ${owner[0]?.first_name} ${owner[0]?.last_name}`}>

                <Avatar component= 'div' src={owner[0].prof_pic_path} sx={{ height: 36, width: 36 }} />
              </Tooltip>
              {notOwner4.map(person => {
                return (
                  <Tooltip
                    key={person.id}
                    PopperProps={{
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -12],
                          },
                        },
                      ],
                    }}
                    title={`${person?.first_name} ${person?.last_name}`}>
                    <Avatar src={person?.prof_pic_path} sx={{ height: 24, width: 24 }} />
                  </Tooltip>
                )
              })}
              {/* bring in avatars from all collaborators, with owner largest */}
            </AvatarGroup>
          </Box>
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
        hideBackdrop={true}
        onClose={() => setDeleteOpen(false)}
      >


        <Box sx={{ ...smallModal, top: mousePos.y, left: mousePos.x, boxShadow: 5, transform: getTransform(mousePos) }}>
          <DeleteProjectModal
            setDeleteOpen={setDeleteOpen}
            projectID={project.id}
          />
        </Box>
      </Modal>

    </Box>
  )

}
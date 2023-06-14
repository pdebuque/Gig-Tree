import { Box, Typography, Container, Paper, Grid, Modal, IconButton } from '@mui/material'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectPageGeneral from '../../ProjectPageGeneral/ProjectPageGeneral';
import ProjectDatesPeople from '../../ProjectDatesPeople/ProjectDatesPeople';
import { largeModal } from '../../../_style/modalStyle'
import CreateProject from '../../CreateProject/CreateProject'
import EditIcon from '@mui/icons-material/Edit'

//model
import { RootState } from '../../../redux/reducers/_root.reducer';


export default function ProjectPage() {

  const { projectId } = useParams()
  const dispatch = useDispatch()

  // on page load, get the right project
  useEffect(() => {
    dispatch({ type: 'GET_CURRENT_PROJECT', payload: projectId })
  }, [])

  const [createOpen, setCreateOpen] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const project = useSelector((store:RootState) => store.currentProject);
  const user = useSelector((store:RootState) => store.user)

  const handleClickEdit = () => {
    setCreateOpen(true);
    dispatch({ type: 'SET_NEW_PROJECT', payload: project })
  }

  return (
    <Container disableGutters>

      <Paper sx={{ p: 2, marginY: 1 }}>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant='h4'>
              {project.name}
            </Typography>
            <Typography variant='body1'>
              {project.ensemble_name}
            </Typography>
          </Box>
          {user.id === project.owner_id &&
            <IconButton onClick={handleClickEdit}>
              <EditIcon />
            </IconButton>}
        </Box>
      </Paper>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <ProjectPageGeneral />
        </Grid>
        <Grid item xs={8}>
          <ProjectDatesPeople />
        </Grid>


      </Grid>
      <Modal
        open={createOpen}
      >
        <Box sx={largeModal}>
          <CreateProject createMode={createMode} setCreateOpen={setCreateOpen} />
        </Box>
      </Modal>

    </Container>
  )
}
import {Box, Typography, Container, Paper, Grid} from '@mui/material'
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ProjectPageGeneral from '../ProjectPageGeneral/ProjectPageGeneral';
import ProjectDatesPeople from '../ProjectDatesPeople/ProjectDatesPeople';

export default function ProjectPage() {

  const {projectId} = useParams()
  const dispatch = useDispatch()

  // on page load, get the right project
  useEffect(()=>{
    dispatch({type: 'GET_CURRENT_PROJECT', payload: projectId})
  },[])

  const project = useSelector(store=>store.currentProject);
  const user = useSelector(store=>store.user)

  return(
    <Container disableGutters>
      <Paper sx={{ p: 2, marginY: 1 }}>
        <Typography variant = 'h4'>
          {project.name}
        </Typography>
        <Typography variant = 'body'>
          {project.ensemble_name}
        </Typography>

        <Grid container spacing = {1}>
          <Grid item xs = {5}>
            <ProjectPageGeneral />
          </Grid>
          <Grid item xs = {7}>
            <ProjectDatesPeople/>
          </Grid>


        </Grid>
      </Paper>
      project page. {projectId}
      {JSON.stringify(project)}
    </Container>
  )
}
import { useSelector } from 'react-redux';
import {useState} from 'react'

import { Box, Grid, Typography, Stack, Paper, Modal, IconButton } from '@mui/material'
import RepertoireItem from '../RepertoireItem/RepertoireItem'


export default function ProjectPageGeneral() {

  const user = useSelector (store=>store.user)
  const project = useSelector(store => store.currentProject)
  const [createOpen, setCreateOpen] = useState(false)
  const [createMode, setCreateMode] = useState(false)

  return (
    <Paper sx={{ p: 2, marginTop: 0, height: 600}}>
      

      <Typography variant='h5' sx = {{marginBottom: 2}}>
        General
      </Typography>
      <Stack spacing={1} sx = {{marginLeft: 1}}>
        <Typography variant='h6'>
          About
        </Typography>
        <Typography variant='body1'>
          {project.description ? project.description : 'no description yet!'}
        </Typography>
        <Typography variant='h6'>
          Resources
        </Typography>
        <Typography variant='body1'>
          {project.resources ? project.resources : 'no resources yet!'}
        </Typography>
        <Typography variant='h6'>
          Repertoire
        </Typography>
      </Stack>
      <Grid container spacing = {1} sx = {{ marginTop: 1, borderRadius: 2, padding: 1, bgcolor: 'grey.100'}}>
        {!project.repertoire.length && 
        <RepertoireItem piece = {{name: 'no piece', composer: 'no composer'}} gridWidth = {12}/>
        }
        {project.repertoire.map(piece => {
          return (
            <RepertoireItem piece={piece} gridWidth = {6} />
          )
        })}
      </Grid>


    </Paper>
  )
}
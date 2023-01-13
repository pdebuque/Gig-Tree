import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import CollaboratorItem from '../CollaboratorItem/CollaboratorItem';
import {largeBoxStyle} from '../../_style/greyBoxStyle'


export default function ProjectPageDates() {

  const project = useSelector(store => store.currentProject)
  const people = project.collaborators

  return (
    <Box sx={largeBoxStyle}>
    <Grid container spacing={1} >
      {people.map(collaborator => {
        return (
          <Grid item xs={4} key = {collaborator.id}>
            <CollaboratorItem collaborator={collaborator} />
          </Grid>
        )
      })}
    </Grid>
    </Box>
  )
}
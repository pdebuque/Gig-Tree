import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import CollaboratorItem from '../CollaboratorItem/CollaboratorItem';
import {largeBoxStyle} from '../../_style/greyBoxStyle'

// model
import { RootState } from '../../redux/reducers/_root.reducer';


export default function ProjectPageDates() {

  const project = useSelector((store:RootState) => store.currentProject)
  const people = project.collaborators

  return (
    <Box sx={largeBoxStyle}>
    <Grid container spacing={1} >
      {people.map((collaborator:any) => {
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
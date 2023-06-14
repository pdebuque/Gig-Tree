// libraries - functions
import { useSelector } from 'react-redux';

// libraries - components
import { Typography, Container, Grid, Box } from '@mui/material';

// internal - components
import RepertoireItem from '../RepertoireItem/RepertoireItem';
import CollaboratorItem from '../CollaboratorItem/CollaboratorItem';
import DateDisplay from '../DateDisplay/DateDisplay';

// internal - other 
import { greyBoxStyle } from '../../_style/greyBoxStyle'

// model
import { RootState } from '../../redux/reducers/_root.reducer'
import { UserT, PieceT, DateT, } from '../../model'

export default function CreateReview() {

  const newProject = useSelector((store: RootState) => store.newProject)

  const placeholderText = {
    color: 'grey.700',
    fontStyle: 'italic',
  }

  return (
    <Container disableGutters sx={{ padding: 1 }}>
      <Grid container spacing={1}>
        {/* all this for the title and ensemble, conditional formatting */}
        <Grid item xs={2}>
          <Typography>general</Typography>
        </Grid>
        <Grid item xs={10}>
          <Box>
            {newProject.name ?
              <Typography display='inline' variant='h5'>{newProject.name} </Typography>
              :
              <Typography display='inline' variant='h6' sx={placeholderText}>
                -- unnamed project --
              </Typography>
            }
            <Typography display='inline' variant='body1'>&nbsp; &nbsp; with &nbsp; &nbsp;</Typography>
            {newProject.ensemble_name ?
              <Typography display='inline' variant='h5'>{newProject.ensemble_name}</Typography>
              :
              <Typography display='inline' variant='h6' sx={placeholderText}>
                unnamed ensemble
              </Typography>
            }
          </Box>
          <Box sx={{ borderLeft: 2, borderColor: 'grey.700', paddingX: 1, marginTop: 1, marginLeft: 2, bgcolor: 'grey.50' }}>
            {newProject.description ? <Typography variant='body1'>{newProject.description}</Typography> : <Typography variant='body1' sx={placeholderText}> -- no description added -- </Typography>}
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Typography>repertoire</Typography>
        </Grid>
        <Grid item xs={10}>
          <Box sx={greyBoxStyle}>
            {newProject.repertoire.length ?
              <Grid container spacing={1}>
                {newProject.repertoire.map((piece: PieceT) => {
                  return (
                    <Grid item key={piece.id} xs={4}>
                      <RepertoireItem piece={piece} generalInfo= {{name: '', ensemble_name: '', description:'', repertoire: [], backgroundColor:'', color: ''}} />
                    </Grid>
                  )
                })}
              </Grid>
              :
              <Typography variant='body1' sx={placeholderText}>
                no pieces added!
              </Typography>
            }

          </Box>
        </Grid>
        <Grid item xs={2}>
          <Typography>schedule</Typography>
        </Grid>
        <Grid item xs={10}>
          <Box sx={greyBoxStyle}>
            {newProject.dates.length ?
              <Grid container spacing={1}>
                {newProject.dates.map((date: DateT) => {
                  return (
                    <Grid item key={date.id} xs={6}>
                      <DateDisplay date={date} />
                    </Grid>
                  )
                })}
              </Grid>
              :
              <Typography variant='body1' sx={placeholderText}>
                no dates added!
              </Typography>
            }
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Typography>invited</Typography>
        </Grid>
        <Grid item xs={10}>
          <Box sx={greyBoxStyle}>
            {newProject.collaborators.length ?
              <Grid container spacing={1}>
                {newProject.collaborators.map((collaborator:UserT) => {
                  return (
                    <Grid item xs={4} key={collaborator.id}>
                      <CollaboratorItem collaborator={collaborator} />
                    </Grid>
                  )
                })}
              </Grid>
              :
              <Typography variant='body1' sx={placeholderText}>
                no collaborators added!
              </Typography>
            }

          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
import './Home.css';
import { Grid, Typography, Paper, Avatar, Box } from '@mui/material'

export default function Home() {


  /* 
  some backend mapping here...

  projects will exist in projects.reducer.js, in src/redux/reducers. axios calls will be handled in projects.saga.js

  */


  return (
    <Box sx={{ width: '90%', marginX: 'auto', p: 1 }}>
      <Paper sx={{ p: 2, marginY: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={.5}>
            </Grid>
          <Grid item xs={1}>
            <Avatar src='images/prof-pics/Paolo-prof-pic.png' alt='Paolo profile pic' sx={{ width: 100, height: 100 }} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h2'>User Name</Typography>
            <Typography variant='subtitle1'>instrument 1, instrument 2</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='body2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. A quas dicta labore commodi maxime magni voluptatum officiis laboriosam alias?
            </Typography>

          </Grid>
        </Grid >
      </Paper>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, mY: 1 }}>
            projects go here
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ p: 2, mY: 1 }}>
            calendar goes here
          </Paper>
        </Grid></Grid>
    </Box>




  )
}
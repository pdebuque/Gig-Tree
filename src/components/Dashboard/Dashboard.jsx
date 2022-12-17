import EditUserModal from '../EditUserModal/EditUserModal';
import DashboardProjects from '../DashboardProjects/DashboardProjects';
import DashboardCalendar from '../DashboardCalendar/DashboardCalendar'

import './Dashboard.css';
import { Grid, Typography, Paper, Avatar, Box, Modal, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

//react stuff
import { useState, useEffect } from 'react';

// react-redux
import { useSelector, useDispatch } from 'react-redux'

export default function Home() {

  const dispatch = useDispatch()
  const user = useSelector(store => store.user)
  const [editModalOpen, setEditOpen] = useState(false)

  // useEffect(()=>{
  //   console.log('fetching projects');
  //   // dispatch({type: 'FETCH_PROJECTS})
  // },[])


  /* 
  some backend mapping here...

  projects will exist in projects.reducer.js, in src/redux/reducers. axios calls will be handled in projects.saga.js

  also need to fetch user to populate the header

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
          <Grid item xs={5}>
            <Typography variant='h2'>{user.first_name} {user.last_name}</Typography>
            <Typography variant='subtitle1'>{user.instrument_1}, {user.instrument_2}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='body2'>
              {user.bio}
            </Typography>

          </Grid>
          <Grid item xs={1}>
            <IconButton aria-label='edit' onClick={() => setEditOpen(true)}>
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid >
      </Paper>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, mY: 1 }}>
            <DashboardProjects />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ p: 2, mY: 1 }}>
            <DashboardCalendar />
          </Paper>
        </Grid></Grid>
      <Modal open={editModalOpen}><EditUserModal setEditOpen={setEditOpen} /></Modal>
    </Box>

  )
}
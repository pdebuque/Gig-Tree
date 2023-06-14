// library - functions
import { useSelector } from 'react-redux'
import { useState } from 'react'

// library - components
import { Paper, Grid, Typography, IconButton, Modal, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

// internal - components
import EditUserModal from '../EditUserModal/EditUserModal';
import NextEvent from '../NextEvent/NextEvent';
import DashboardHeaderBio from '../DashboardHeaderBio/DashboardHeaderBio';
import UserAvatar from '../_Assets/UserAvatar'

// model
import { RootState } from '../../redux/reducers/_root.reducer'


export default function DashboardHeader() {
  const user = useSelector((store:RootState) => store.user)
  const [editModalOpen, setEditOpen] = useState(false)


  // // bunch of logic to find the next date
  // function sortDates(a,b) {
  //   if (new Date(a.date)>new Date(b.date)) return 1
  //   if (new Date(a.date)<new Date(b.date)) return -1
  //   return 0
  // }

  // const now = new Date()
  // const dates = useSelector(store=>store.dates)
  // const upcomingDates = dates.filter(date=> new Date(date.date)>now)
  // const nextDate = upcomingDates.sort(sortDates)[0]


  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Paper sx={{ p: 2, marginY: 1, height: 100 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              {/* <Grid item xs={.5}>
          </Grid> */}
              <Box sx={{ ml: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <UserAvatar height='300' width='300' user={user} tooltipText={`${user.first_name}'s avatar`} />


                {/* <Avatar src={user.prof_pic_path} alt={`${user.first_name}'s profile picture`} sx={{ width: 100, height: 100 }} /> */}
                <Box sx={{ ml: 4 }}>
                  <Typography variant='h3'>{user.first_name} {user.last_name}</Typography>
                  <Typography variant='body1'>{user.instrument_1}{user.instrument_2 && `, ${user.instrument_2}`}{user.instrument_3 && `, ${user.instrument_3}`}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                <IconButton aria-label='edit' onClick={() => setEditOpen(true)}>
                  <EditIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ p: 2, marginY: 1, height: 100 }}>

            <DashboardHeaderBio
            />



          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper sx={{ p: 2, marginY: 1, height: 100 }}>
            <NextEvent />
          </Paper>
        </Grid>
      </Grid >
      <Modal open={editModalOpen}>
        <Box><EditUserModal setEditOpen={setEditOpen} /></Box></Modal>

    </Box>
  )
}
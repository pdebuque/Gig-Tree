import { Paper, Grid, Avatar, Typography, IconButton, Modal, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import EditUserModal from '../EditUserModal/EditUserModal';
import EditIcon from '@mui/icons-material/Edit';

export default function DashboardHeader() {
  const user = useSelector(store => store.user)
  const [editModalOpen, setEditOpen] = useState(false)

  return (
    <Box>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Paper sx={{ p: 2, marginY: 1, height: 100 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* <Grid item xs={.5}>
          </Grid> */}
              <Box sx ={{ml: 2}}>
                <Avatar src={user.prof_pic_path} alt={`${user.first_name}'s profile picture`} sx={{ width: 100, height: 100 }} />
              </Box>
              <Box sx={{ml: 4}}>
                <Typography variant='h3'>{user.first_name} {user.last_name}</Typography>
                <Typography variant='body1'>{user.instrument_1}{user.instrument_2 && `, ${user.instrument_2}`}{user.instrument_3 && `, ${user.instrument_3}`}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx= {{ p: 2, marginY: 1, height: 100 }}>
            <Typography variant='body2'>
              {user.bio}
            </Typography>

            <IconButton aria-label='edit' onClick={() => setEditOpen(true)}>
              <EditIcon />
            </IconButton>
          </Paper>
        </Grid>

        <Grid item xs= {3}>
          <Paper sx= {{ p: 2, marginY: 1, height: 100 }}>
            blah blah blah
          </Paper>
        </Grid>
      </Grid >
      <Modal open={editModalOpen}><EditUserModal setEditOpen={setEditOpen} /></Modal>

    </Box>
  )
}
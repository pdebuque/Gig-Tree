import { Box, Grid, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export default function DashboardHeaderBio() {

  const user = useSelector(store => store.user)

  // jobs

  // location

  // 

  return (
    <Grid container spacing={1}>

      <Grid item xs={2}>
        <WorkOutlineOutlinedIcon style={{ color: 'grey', fontSize: 'medium' }} />
      </Grid>

      <Grid item xs={10}>
        <Typography>{user.job_1 ? `${user.job_1} ${user.job_1_location && `at ${user.job_1_location}`}` : 'no jobs yet!'}
        </Typography>
      </Grid>

      {user.job_2 &&
        <>
          <Grid item xs={2}>
            <WorkOutlineOutlinedIcon style={{ color: 'grey', fontSize: 'medium' }} />
          </Grid>
          <Grid item xs={10}>
            <Typography>
              {user.job_2} {user.job_2_location && `at ${user.job_2_location}`}
            </Typography>
          </Grid>
        </>
      }

    </Grid>
  )
}
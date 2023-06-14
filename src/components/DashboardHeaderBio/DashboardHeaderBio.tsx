import { Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';


// model
import { RootState } from '../../redux/reducers/_root.reducer'

export default function DashboardHeaderBio() {

  const user = useSelector((store: RootState) => store.user)

  // jobs

  // location

  // 

  return (
    <Grid container spacing={1} sx ={{}}>
{/* {JSON.stringify(user)} */}
      <Grid item xs={1}>
        <WorkOutlineOutlinedIcon style={{ color: 'grey', fontSize: 'medium' }} />
      </Grid>
      <Grid item xs={11}>
        <Typography>{user.job_1 ? `${user.job_1}  ${user.job_1_location && `at ${user.job_1_location}`}` : 'no jobs yet!'}
        </Typography>
      </Grid>

      {user.job_2 &&
        <>
          <Grid item xs={1}>
            <WorkOutlineOutlinedIcon style={{ color: 'grey', fontSize: 'medium' }} />
          </Grid>
          <Grid item xs={11}>
            <Typography>
              {user.job_2} {user.job_2_location && `at ${user.job_2_location}`}
            </Typography>
          </Grid>
        </>
      }

      <Grid item xs={1}>
        <LocationOnOutlinedIcon style={{ color: 'grey', fontSize: 'medium' }}/>
      </Grid>

      <Grid item xs={11}>
        <Typography>
          {user.location ? user.location : 'no location yet!'}
        </Typography>
      </Grid>

    </Grid>
  )
}
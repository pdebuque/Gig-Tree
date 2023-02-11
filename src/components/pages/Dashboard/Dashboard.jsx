
import DashboardProjects from '../../DashboardProjects/DashboardProjects';
import DashboardCalendar from '../../DashboardCalendar/DashboardCalendar'
import DashboardHeader from '../../DashboardHeader/DashboardHeader'

import './Dashboard.css';
import { Grid,  Paper,  Box, } from '@mui/material';

//react stuff
import { useEffect } from 'react';

// react-redux
import { useDispatch } from 'react-redux'

export default function Home() {

  const dispatch = useDispatch()
  // const user = useSelector(store => store.user)
  // const [editModalOpen, setEditOpen] = useState(false)

  useEffect(()=>{
    // console.log('fetching projects');
    dispatch({type: 'GET_PROJECTS'})
  },[])


  /* 
  some backend mapping here...

  projects will exist in projects.reducer.js, in src/redux/reducers. axios calls will be handled in projects.saga.js

  also need to fetch user to populate the header

  */


  return (
    <Box sx={{ width: '90%', marginX: 'auto', p: 1 }}>
      <DashboardHeader />
      <Grid container spacing={1} sx={{ height: 600 }}>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, height: 600}}>
            <DashboardProjects />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ p: 2, mY: 1, height: 600 }}>
            <DashboardCalendar />
          </Paper>
        </Grid></Grid>

    </Box>

  )
}
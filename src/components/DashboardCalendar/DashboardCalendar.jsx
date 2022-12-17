/* 
this component is the calendar sidebar in the dashboard.

it will get all of the user's project dates from the server and render a react-big-calendar
*/


import {Box, Typography} from '@mui/material'

export default function DashboardCalendar() {
  return(
    <Box>
      <Typography variant='h5'>Calendar</Typography>
      <Typography variant='body1'>calendar will go here</Typography>
    </Box>
  )
}
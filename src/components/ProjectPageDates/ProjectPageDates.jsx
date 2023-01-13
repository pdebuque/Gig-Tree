import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import DateDisplay from '../DateDisplay/DateDisplay';
import {largeBoxStyle} from '../../_style/greyBoxStyle'

export default function ProjectPageDates() {

  const project = useSelector(store => store.currentProject)
  const dates = project.dates

  return (
    <Box  sx={largeBoxStyle} >
    <Grid container spacing={1}>
      {dates.map(date => {
        return (
          <Grid item xs={6} key = {date.id}>
            <DateDisplay date={date} />
          </Grid>
        )
      })}
    </Grid>
    </Box>
  )
}
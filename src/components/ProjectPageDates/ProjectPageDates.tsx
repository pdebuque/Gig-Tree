import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import DateDisplay from '../DateDisplay/DateDisplay';
import {largeBoxStyle} from '../../_style/greyBoxStyle'

// model

// import { DateT } from '../../model'
import { RootState } from '../../redux/reducers/_root.reducer';

export default function ProjectPageDates() {

  const project = useSelector((store:RootState) => store.currentProject)
  const dates = project.dates

  return (
    <Box  sx={largeBoxStyle} >
    <Grid container spacing={1}>
      {dates.map((date:any) => {
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
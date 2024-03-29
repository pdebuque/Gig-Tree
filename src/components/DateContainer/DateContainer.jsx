import {Container, Grid, Paper } from '@mui/material'
import DateInput from '../DateInput/DateInput'
import DateDisplay from '../DateDisplay/DateDisplay'

export default function DateInputContainer({ dates, setDates }) {

  return (
    <Container disableGutters>
      {/* {JSON.stringify(dates)} */}
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <Paper>
            <DateInput setDates={setDates} dates={dates} />
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper>
            {/* date display */}
            dates: {JSON.stringify(dates)}
            {dates.map((date,i) => {
              return (
                <DateDisplay key = {i} date={date}/>
              )
            })}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
import { Button, Container, Grid, Paper } from '@mui/material'
import { useState } from 'react'
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
            {dates.map(date => {
              return (
                <DateDisplay date={date} />
              )
            })}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
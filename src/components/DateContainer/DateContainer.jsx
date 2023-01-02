import { Button, Container, Grid, Paper } from '@mui/material'
import { useState } from 'react'
import DateInput from '../DateInput/DateInput'
import DateDisplay from '../DateDisplay/DateDisplay'

export default function DateInputContainer() {

  // dates is an array of objects. submitting date on the left pushes into the array, which then renders on the right hand side
  // eventually the initial state should hook up to redux
  const [dates, setDates] = useState([])

  return (
    <Container>
      {JSON.stringify(dates)}
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <Paper>
            <DateInput setDates = {setDates} dates = {dates}/>
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper>

          </Paper>
          {/* date display */}
          {dates.map(date=>{
            return (
              <DateDisplay date = {date}/>
            )
          })}

        </Grid>
      </Grid>
    </Container>
  )
}
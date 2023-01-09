import { Button, Typography, Container, Grid, Paper, Stack } from '@mui/material'
import DateContainer from '../DateContainer/DateContainer'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import DateInput from '../DateInput/DateInput'
import DateDisplay from '../DateDisplay/DateDisplay'

export default function CreateSchedule({ setTab, dates, setDates }) {

  // dates is an array of objects. submitting date on the left pushes into the array, which then renders on the right hand side

  dates?.map((date, i) => {
    date.tempId = i
  })

  // temporary date holding place for inputs
  const [dateTemp, setDateTemp] =
  useState({
    tempID: null,
    name: '',
    date: new Date(),
    start: new Date(),
    end: new Date(),
    location: '',
    type: '',
    notes: '',
  })

  return (
    <Container>

      <Typography variant='h6'>add dates</Typography>
      <Container disableGutters>
        {/* {JSON.stringify(dates)} */}
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Paper>
              <DateInput dateTemp={dateTemp} setDateTemp={setDateTemp} setDates={setDates} dates={dates} />
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Stack spacing={1}>
              {/* date display */}
              {/* dates: {JSON.stringify(dates)} */}
              {dates.map((date, i) => {
                return (
                  <DateDisplay key={date.tempId} dateTemp = {dateTemp} setDateTemp = {setDateTemp} setDates={setDates} dates={dates} date={date} />
                )
              })}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}
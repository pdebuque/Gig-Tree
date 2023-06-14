import { Button, Typography, Container, Grid, Paper, Stack, Box } from '@mui/material'
import { useState } from 'react'
import {DateTime} from 'luxon'

import {grey} from '@mui/material/colors'

// internal - components
import DateInput from '../DateInput/DateInput'
import DateDisplay from '../DateDisplay/DateDisplay';

import { largeBoxStyle } from '../../_style/greyBoxStyle';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

// model

import { DateT } from '../../model'

type Props = {
  dates: DateT[],
  setDates: React.Dispatch<React.SetStateAction<DateT[]>>,
}

const CreateSchedule =({dates, setDates }:Props) =>{

  // dates is an array of objects. submitting date on the left pushes into the array, which then renders on the right hand side

  dates?.map((date, i) => {
    date.tempId = i
  })

  // temporary date holding place for inputs
  const [dateTemp, setDateTemp] =
    useState<DateT>({
      id: 0,
      name: '',
      tempId: 0,
      location: '',
      date: DateTime.now(),
      start: DateTime.now(),
      end: DateTime.now(),
      project_id: 0,
      type: '',
      notes: '',
      project_name: '',
      ensemble_name: '',
      backgroundColor:'',
      color: ''
    })

  
  return (
    <Container>
      {/* 
      <Typography variant='h6'>add dates</Typography> */}
      <Container disableGutters>
        {/* {JSON.stringify(dates)} */}
        <Grid container spacing={1} sx={{ paddingTop: 1 }}>
          <Grid item xs={5}>
            <Paper sx={{ paddingTop: 3 }}>
              <Typography variant='h6' textAlign='center' sx={{ marginBottom: 1 }}>create date</Typography>
              <DateInput dateTemp={dateTemp} setDateTemp={setDateTemp} setDates={setDates} dates={dates} />
            </Paper>
          </Grid>
          <Grid item xs={1}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <KeyboardDoubleArrowRightIcon sx = {{color: grey[600]}} />
              <KeyboardDoubleArrowRightIcon sx = {{color: grey[600]}} />
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ ...largeBoxStyle, height: 450, paddingTop: 10 }}>
            <Stack spacing={1}>
              {/* date display */}
              {/* dates: {JSON.stringify(dates)} */}
              {dates.reverse().map((date, i) => {
                return (
                  <DateDisplay key={date.tempId} dateTemp={dateTemp} setDateTemp={setDateTemp} setDates={setDates} dates={dates} date={date} />
                )
              })}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}

export default CreateSchedule
import { Button, Typography, Container } from '@mui/material'
import DateContainer from '../DateContainer/DateContainer'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'

export default function CreateSchedule({ setTab, dates, setDates }) {

    // dates is an array of objects. submitting date on the left pushes into the array, which then renders on the right hand side

  return (
    <Container>
      <Typography variant='h6'>add dates</Typography>
      <DateContainer dates={dates} setDates={setDates} />
    </Container>
  )
}
import { Button, Typography, Container } from '@mui/material'
import DateContainer from '../DateContainer/DateContainer'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'

export default function CreateSchedule({ setTab }) {

  const dispatch = useDispatch();
  const newProject = useSelector(store => store.newProject)
    // dates is an array of objects. submitting date on the left pushes into the array, which then renders on the right hand side
  const [dates, setDates] = useState(newProject.dates)

  const handleSubmit = () => {
    console.log('submitting dates to redux')
    dispatch({ type: 'SET_SCHEDULE', payload: dates })
    setTab(2);
  }

  return (
    <Container>
      <Typography variant='h6'>add dates</Typography>
      <DateContainer dates={dates} setDates={setDates} />
      <Button onClick={handleSubmit}>save and invite collaborators</Button>
    </Container>
  )
}
import { Container, TextField, Button } from '@mui/material'
import { useState } from 'react'


export default function DateInput({ dates, setDates }) {

  // state holds the current data. on submit, push it to the dates array in the container

  // todo: align date info data names with database columns
  const [dateInfo, setDateInfo] =
    useState({
      title: '',
      date: '',
      start: '',
      end: '',
      location: '',
      type: '',
      notes: '',
    })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('adding date info to array: ', dateInfo)
    setDates([...dates, dateInfo])
    setDateInfo({
      title: '',
      date: '',
      start: '',
      end: '',
      location: '',
      type: '',
      notes: '',
    })
  }

  return (

    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          name='title-input'
          label='title'
          size='small'
          value={dateInfo.title}
          onChange={e => setDateInfo({ ...dateInfo, title: e.target.value })}
        />
        <TextField
          name='date-input'
          label='date'
          size='small'
          value={dateInfo.date}
          onChange={e => setDateInfo({ ...dateInfo, date: e.target.value })}
        />
        <TextField
          name='start-input'
          label='start'
          size='small'
          value={dateInfo.start}
          onChange={e => setDateInfo({ ...dateInfo, start: e.target.value })}
        />
        <TextField
          name='end-input'
          label='end'
          size='small'
          value={dateInfo.end}
          onChange={e => setDateInfo({ ...dateInfo, end: e.target.value })}
        />
        <TextField
          name='location-input'
          label='location'
          size='small'
          value={dateInfo.location}
          onChange={e => setDateInfo({ ...dateInfo, location: e.target.value })}
        />
        <TextField
          name='type-input'
          label='type'
          size='small'
          value={dateInfo.type}
          onChange={e => setDateInfo({ ...dateInfo, type: e.target.value })}
        />
        <TextField
          name='notes-input'
          label='notes'
          size='small'
          value={dateInfo.notes}
          onChange={e => setDateInfo({ ...dateInfo, notes: e.target.value })}
          multiline
          rows={3}
        />
        <Button type='submit'>add</Button>
      </form>

    </Container>
  )
}
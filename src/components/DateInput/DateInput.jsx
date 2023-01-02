import { Container, TextField, Button } from '@mui/material'
import { useState } from 'react';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


export default function DateInput({ dates, setDates }) {

  // state holds the current data. on submit, push it to the dates array in the container

  // todo: align date info data names with database columns
  const [dateInfo, setDateInfo] =
    useState({
      name: '',
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
      name: '',
      date: '',
      start: '',
      end: '',
      location: '',
      type: '',
      notes: '',
    })
  }

  return (

    <Container component='form' onSubmit={handleSubmit}>
      {JSON.stringify(dateInfo)}
      <TextField
        name='title-input'
        label='title'
        size='small'
        value={dateInfo.name}
        onChange={e => setDateInfo({ ...dateInfo, name: e.target.value })}
      />

      <LocalizationProvider dateAdapter={AdapterMoment} >
        <DatePicker
          name='date-input'
          label='date'
          value={dateInfo.date || null}
          onChange={value => {
            console.log(value._d.toDateString())
            setDateInfo({ ...dateInfo, date: value._d.toLocaleDateString() })
          }}
          renderInput={(params) => <TextField size='small' {...params} />}
        />
        <TimePicker
          label="start"
          value={dateInfo.start || null}
          onChange={value => setDateInfo({ ...dateInfo, start: value._d.toLocaleTimeString() })}
          renderInput={(params) => <TextField size='small' {...params} />}
        />

        <TimePicker
          label="end"
          value={dateInfo.end || null}
          onChange={value => setDateInfo({ ...dateInfo, end: value._d.toLocaleTimeString() })}
          renderInput={(params) => <TextField size='small' {...params} />}
        />

      </LocalizationProvider>
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
    </Container>
  )
}
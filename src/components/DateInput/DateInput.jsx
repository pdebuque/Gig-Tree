import { Container, TextField, Button, Stack, FormControl, Select, InputLabel, MenuItem } from '@mui/material'
import { useState } from 'react';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import {convertTime} from '../../modules/convertTime'

export default function DateInput({ dates, setDates }) {

  // state holds the current data. on submit, push it to the dates array in the container

  // dates are held as objects here. these need to be converted to locale string in the server, then back to objects

  const [dateInfo, setDateInfo] =
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // save converted time info into the dateInfo object
    console.log('adding date info to array: ', dateInfo)
    setDates([...dates, dateInfo])
    setDateInfo({
      tempID: null,
      name: '',
      date: new Date(),
      start: new Date(),
      end: new Date(),
      location: '',
      type: '',
      notes: '',
    })
  }

  // hold time info here: helps input fields, need a repository before converting them to data usable by calendar


  return (

    <Container component='form' onSubmit={handleSubmit}>
      date info: {JSON.stringify(dateInfo)}
      
<br/>
    
      <Stack spacing={1}>
        <TextField
          name='title-input'
          label='title'
          size='small'
          value={dateInfo.name}
          onChange={e => {setDateInfo({ ...dateInfo, name: e.target.value })}}
        />

        <LocalizationProvider dateAdapter={AdapterMoment} >
          <DatePicker
            name='date-input'
            label='date'
            value={dateInfo.date || null}
            onChange={value => {
              if (value) setDateInfo({ ...dateInfo, date: value._d })
            }}
            renderInput={(params) => <TextField size='small' {...params} />}
          />
          <TimePicker
            label="start"
            value={dateInfo.start || null}
            onChange={value => {
              if (value) setDateInfo({ ...dateInfo, start: convertTime(dateInfo.date,value._d)})
            }}
            renderInput={(params) => <TextField size='small' {...params} />}
          />

          <TimePicker
            label="end"
            value={dateInfo.end || null}
            onChange={value => {
              if (value) setDateInfo({ ...dateInfo, end: convertTime(dateInfo.date, value._d) })
            }}
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
        <FormControl>
          <InputLabel id="type-label">type</InputLabel>
          <Select
            labelId="type-label"
            value={dateInfo.type}
            size='small'
            label="type"
            onChange={e => setDateInfo({ ...dateInfo, type: e.target.value })}
          >
            <MenuItem value={'rehearsal'}>Rehearsal</MenuItem>
            <MenuItem value={'performance'}>Performance</MenuItem>
            <MenuItem value={'recording'}>Recording</MenuItem>
          </Select>
        </FormControl>
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
      </Stack>
    </Container>
  )
}
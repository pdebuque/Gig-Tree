import { Container, TextField, Button, Stack, FormControl, Select, InputLabel, MenuItem } from '@mui/material'

import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { convertTime } from '../../modules/convertTime'

import {DateTime} from 'luxon'

// model

import { DateT } from '../../model'


type Props = {
  dates: DateT[],
  setDates: React.Dispatch<React.SetStateAction<DateT[]>>,
  dateTemp: DateT,
  setDateTemp: React.Dispatch<React.SetStateAction<DateT>>
}

const DateInput: React.FC<Props> = ({ dates, setDates, dateTemp, setDateTemp }) => {

  /* 
  three sources of state:
  
  broad: newProject. exists in redux. updated piecemeal through dispatches on submissions at each create tab (buttonFunction)
  
  middle: [dates, setDates]. initialized as newProject.dates (for edit project functionality). updates when user clicks add date button in DateInput
  
  low: [dateTemp, setDateTemp]. initialized as empty. updates onChange of inputs in DateInput.
  */

  // dateTemp is local staging area (only in this component). it holds dates as objects for proper MUI usage.
  // 

  // const [dateTemp, setDateTemp] =
  //   useState({
  //     tempID: null,
  //     name: '',
  //     date: new Date(),
  //     start: new Date(),
  //     end: new Date(),
  //     location: '',
  //     type: '',
  //     notes: '',
  //   })

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {

    // submit moves the date info from the very local staging area (dateTemp) to the dates staging area, dates. This will be pushed to newProject when user clicks save and invite button.

    // dates live as strings in newProject

    e.preventDefault();
    // save converted time info into the dateTemp object
    console.log('adding date info to array: ', dateTemp)
    const dateFormatted = {
      ...dateTemp,
      date: dateTemp.date,
      start: dateTemp.start,
      end: dateTemp.end
    }
    setDates([...dates, dateFormatted])
    // reset dateTemp to empty
    setDateTemp({
      id: 0,
      tempId: 0,
      name: '',
      location: '',
      date: DateTime.now(),
      start: DateTime.now(),
      end: DateTime.now(),
      project_id: 0,
      type: '',
      notes: '',
      project_name: '',
      ensemble_name:'',
      backgroundColor: "",
      color: '',
    })
    
  }

  // hold time info here: helps input fields, need a repository before converting them to data usable by calendar


  return (

    <Container component='form' onSubmit={handleSubmit}>
      {/* date info: {JSON.stringify(dateTemp)} */}


      <Stack spacing={1}>
        <TextField
          name='title-input'
          label='title'
          size='small'
          value={dateTemp.name}
          onChange={e => { setDateTemp({ ...dateTemp, name: e.target.value }) }}
        />

        <LocalizationProvider dateAdapter={AdapterLuxon} >
          <DatePicker
            // name='date-input'
            label='date'
            value={dateTemp.date || null}
            onChange={value => {
              if (value) setDateTemp({ ...dateTemp, date: value })
            }}
            renderInput={(params) => <TextField size='small' {...params} />}
          />

          {/*//todo: setting start time automatically sets the end time to 2 hours later */}
          <TimePicker
            label="start"
            value={dateTemp.start || null}
            onChange={value => {
              if (value) {
                setDateTemp({
                  ...dateTemp,
                  start: value})
                }
                // setDateTemp({
                //   ...dateTemp,
                //   end: setTwoHoursLater(dateTemp.start)
                // })
              
            }}
            renderInput={(params) => <TextField size='small' {...params} />}
          />

          <TimePicker
            label="end"
            value={dateTemp.end || null}
            onChange={value => {
              if (value) setDateTemp({ ...dateTemp, end: value })
            }}
            renderInput={(params) => <TextField size='small' {...params} />}
          />

        </LocalizationProvider>
        <TextField
          name='location-input'
          label='location'
          size='small'
          value={dateTemp.location}
          onChange={e => setDateTemp({ ...dateTemp, location: e.target.value })}
        />
        <FormControl>
          <InputLabel id="type-label">type</InputLabel>
          <Select
            labelId="type-label"
            value={dateTemp.type}
            size='small'
            label="type"
            onChange={e => setDateTemp({ ...dateTemp, type: e.target.value })}
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
          value={dateTemp.notes}
          onChange={e => setDateTemp({ ...dateTemp, notes: e.target.value })}
          multiline
          rows={3}
        />
        <Button type='submit'>add</Button>

      </Stack>
    </Container>
  )
}

export default DateInput
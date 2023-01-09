import { Paper, Container, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

export default function DateDisplay({ date, dates, setDates, dateTemp, setDateTemp }) {

  //todo: logic for default name if not specified
  //todo: formatting

  const handleDelete = () => {
    setDates(dates.filter(element => element.tempId != date.tempId))
  }

  const handleEdit = () => {
    // load this element's data into the inputs, then delete it
    console.log('editing')
  }

  const [editMode, setEditMode] = useState(false)

  // date strings look like 1/8/2023, 4:15:00 PM
  const getDate = (dateString) => {
    return dateString.split(' ')[0].replace(',', '')
  }

  const getTime = (dateString) => {
    const splitArr = dateString.split(' ')
    return splitArr[1].split(':').splice(0, 2).join(':') + ' ' + splitArr[2]
  }

  return (
    <Container>
      {JSON.stringify(date)}
      <Paper sx={{ padding: .5 }}>
        <Typography variant='h5'>{date.name}
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>

        </Typography>
        <Typography variant='body1'>{getDate(date.date)}: {getTime(date.start)}-{getTime(date.end)}</Typography>
        <Typography variant='body2'>{date.notes}</Typography>
      </Paper>
    </Container>
  )
}
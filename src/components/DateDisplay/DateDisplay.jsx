import { Paper, Container, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { getDate, getTime } from '../../modules/formatTimes'

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

  const [editMode, setEditMode] = useState(false);

  return (
    <Container>
      {/* {JSON.stringify(date)} */}
      <Paper sx={{ padding: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant='h5'>
            {date.name}
          </Typography>
          {setDates && dateTemp &&
            <Box>
              <IconButton sx={{ width: 24, height: 24 }} onClick={handleDelete}>
                <DeleteIcon sx={{ width: 20, height: 20 }} />
              </IconButton>
              <IconButton sx={{ width: 24, height: 24 }} onClick={handleEdit}>
                <EditIcon sx={{ width: 20, height: 20 }} />
              </IconButton>
            </Box>}
        </Box>
        <Typography variant='body1'>{getDate(date.date)}: {getTime(date.start)}-{getTime(date.end)}</Typography>
        <Typography variant='body2'>{date.notes}</Typography>
      </Paper>
    </Container>
  )
}
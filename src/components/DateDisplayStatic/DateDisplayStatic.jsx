import { Paper, Container, Typography, } from '@mui/material';

export default function DateDisplay({ date }) {

  //todo: logic for default name if not specified
  //todo: make delete work
  //todo: formatting


  return (
    <Container>
      {/* data types:
      date: {typeof date.date}
      start: {typeof date.start}
      end: {typeof date.end} */}
      <Paper sx={{ padding: .5 }}>
        <Typography variant='h5'>{date.name}
          {/* <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton> */}
        </Typography>
        <Typography variant='body1'>{date.date.toLocaleString()}: {date.start.toLocaleString()}-{date.end.toLocaleString()}</Typography>
        <Typography variant='body2'>{date.notes}</Typography>
      </Paper>
    </Container>
  )
}
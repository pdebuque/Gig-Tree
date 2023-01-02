import { Paper, Container, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DateDisplay({ date }) {

  //todo: logic for default name if not specified
  //todo: make delete work
  //todo: formatting

  const handleDelete = () => {

  }

  return (
    <Container>
      <Paper sx={{ padding: .5 }}>
        <Typography variant='h5'>{date.name}
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Typography>
        <Typography variant='body1'>{date.date}: {date.start}-{date.end}</Typography>
        <Typography variant='body2'>{date.notes}</Typography>
      </Paper>
    </Container>
  )
}
import { Typography, Button, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

export default function CreateReview() {

  const newProject = useSelector(store => store.newProject)

  return (
    <Container>
      <Typography variant='h6'>review</Typography>
      {JSON.stringify(newProject)}
    </Container>
  )
}
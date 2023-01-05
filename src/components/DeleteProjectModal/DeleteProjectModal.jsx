import { Container, Typography, Button } from '@mui/material'
import {useDispatch} from 'react-redux'

export default function DeleteProjectModal({ setDeleteOpen, projectID }) {

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch({type: 'DELETE_PROJECT', payload: projectID})
    setDeleteOpen(false)
  }

  return (
    <Container>
      <Typography variant='h5'>Delete?</Typography>
      <Button onClick={handleDelete}>Confirm</Button>
      <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
    </Container>
  )
}
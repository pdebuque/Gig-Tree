import { Container, Typography, Button, Box } from '@mui/material'
import { useDispatch } from 'react-redux'

export default function DeleteProjectModal({ setDeleteOpen, projectID }) {

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch({ type: 'DELETE_PROJECT', payload: projectID })
    setDeleteOpen(false)
  }

  return (
    <Container disableGutters>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <Typography textAlign='center' variant='h5'>Delete?</Typography>
      <Box sx = {{display: 'flex', justifyContent:'center', marginTop: 2}}>
        <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
        <Button onClick={handleDelete}>Confirm</Button>
      </Box>
      </Box>
    </Container>
  )
}
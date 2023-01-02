import { Typography, Button, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

export default function CreateReview() {

  const dispatch = useDispatch();
  const newProject = useSelector(store=>store.newProject)

  const handleSubmit=()=>{
    console.log('submitting project');
    dispatch({type: 'ADD_PROJECT', payload: newProject})
  }

  return (
    <Container>
      <Typography variant='h6'>review</Typography>
      <Button onClick={handleSubmit}>submit</Button>
    </Container>
  )
}
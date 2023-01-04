import { Typography, Button, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

export default function CreateReview({ createMode, setCreateOpen }) {

  const dispatch = useDispatch();
  const newProject = useSelector(store => store.newProject)

  const handleSubmit = () => {
    console.log('submitting project');
    if (createMode) {
      dispatch({ type: 'ADD_PROJECT', payload: newProject })
    }
    else {
      dispatch({ type: 'EDIT_PROJECT', payload: newProject })
    }
    setCreateOpen(false);
  }

  return (
    <Container>
      <Typography variant='h6'>review</Typography>
      <Button onClick={handleSubmit}>submit</Button>
    </Container>
  )
}
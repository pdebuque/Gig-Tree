import { TextField, Container } from '@mui/material';

export default function RepertoireItem() {
  return (
    <Container>
      <TextField 
      name='title-input'
      label='title'
      size='small'
      />
      <TextField 
      name='composer-input'
      label='composer'
      size='small'
      />
    </Container>
  )
}
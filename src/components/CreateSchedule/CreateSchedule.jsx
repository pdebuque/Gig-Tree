import { Button, Typography, Container } from '@mui/material'
import DateContainer from '../DateContainer/DateContainer'

export default function CreateSchedule({setTab}) {


  return (
    <Container>
      <Typography variant='h6'>add dates</Typography>
      <DateContainer />
      <Button onClick ={()=>setTab(2)}>invite collaborators</Button>
    </Container>
  )
}
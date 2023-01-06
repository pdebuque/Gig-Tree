import { Typography, Button, Container, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import RepertoireItem from '../RepertoireItem/RepertoireItem';
import DateDisplayStatic from '../DateDisplayStatic/DateDisplayStatic'

export default function CreateReview() {

  const newProject = useSelector(store => store.newProject)

  return (
    <Container>
      <Typography variant='h5'>
        {newProject.name} with {newProject.ensemble_name}
      </Typography>
      <Typography variant='body1'>
        {newProject.description}
      </Typography>
      <Grid container spacing={1}>
        {newProject.repertoire.map((piece,i)=>{
          return (<RepertoireItem key = {i} piece = {piece} gridWidth = {4} />)
        })}
      </Grid>
      <Grid container spacing = {1}>
        {newProject.dates.map((date,i)=>{
          return (<DateDisplayStatic key = {i} date={date} />)
        })}
      </Grid>
      <br/>
      <br/>
      <br/>
      <br/>
      {JSON.stringify(newProject)}
    </Container>
  )
}
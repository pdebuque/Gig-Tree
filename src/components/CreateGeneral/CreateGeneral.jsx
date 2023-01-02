/* 
each step of the create project dialogue sends info to the store
*/

import { Typography, Container, Button, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import RepertoireContainer from '../RepertoireContainer/RepertoireContainer';
import RepertoireItem from '../RepertoireItem/RepertoireItem';

export default function CreateReview({setTab}) {

  // when the component renders, fetch the data from redux: newProject. On first render, this should populate empty fields.

  // i don't think this needs to use a saga, since the new event is not anywhere in the database. 

  // saga will be necessary on the last page to send the info to the server. reducer will then receive an action to clear the state
  const newEvent = useSelector(store => store.newEvent)

  // on submit, save the current state data into newProject. Then, if a user navigates back to the tab their data will be saved

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('in handleSubmit on CreateReview');
    setTab(1)

  }

  // local state info to send to redux in handleSubmit
  const [generalInfo, setGeneral] = useState({ name: newEvent.name, ensemble_name: newEvent.ensemble_name, description: newEvent.description })

  // this array will receive elements from the add repertoire button, then render
  const [repertoire, setRepertoire] = useState([])


  // logic for creating new repertoire entry fields
  const addRepertoire = () => {
    console.log('in addRepertoire')
  }

  return (
    <Container component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        name='title-input'
        label='project name'
        size='small'
        value={generalInfo.name}
        onChange={e => setGeneral({ ...generalInfo, name: e.target.value })}
      />
      <TextField
        name='ensemble-input'
        label='ensemble name'
        size='small'
        value={generalInfo.ensemble_name}
        onChange={e => setGeneral({ ...generalInfo, ensemble_name: e.target.value })}
      />
      <TextField
        name='description-input'
        label='project description'
        size='small'
        multiline
        rows={3}
        value={generalInfo.description}
        onChange={e => setGeneral({ ...generalInfo, ensemble_name: e.target.value })}
      />
      {repertoire.map(num=>
        {
          return <RepertoireItem key = {num}/>
        })}
      <Button
        size='small'
        color='inherit'
        sx={{ textAlign: 'right', typography: 'body2', mr: 1 }}
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => setRepertoire([...repertoire, repertoire.length+1])}
      >add repertoire</Button>


      <Button sx={{ textAlign: 'right' }} type='submit'>create schedule</Button>

    </Container>
  )
}
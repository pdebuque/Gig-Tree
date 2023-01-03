/* 
each step of the create project dialogue sends info to the store
*/

import { Typography, Container, Button, TextField, Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RepertoireContainer from '../RepertoireContainer/RepertoireContainer';
import RepertoireItem from '../RepertoireItem/RepertoireItem';

export default function CreateReview({ setTab }) {

  const dispatch = useDispatch();

  // when the component renders, fetch the data from redux: newProject. On first render, this should populate empty fields.

  // i don't think this needs to use a saga, since the new event is not anywhere in the database. 

  // saga will be necessary on the last page to send the info to the server. reducer will then receive an action to clear the state

  const newProject = useSelector(store => store.newProject)

  // on submit, save the current state data into newProject. Then, if a user navigates back to the tab their data will be saved

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('in handleSubmit on CreateReview');
    dispatch({ type: 'SET_GENERAL', payload: generalInfo })
    setTab(1);
  }

  // local state info to send to redux in handleSubmit
  const [generalInfo, setGeneral] = useState({ name: newProject.name, ensemble_name: newProject.ensemble_name, description: newProject.description, repertoire: newProject.repertoire })

  // dummy array for keeping track of repertoire input fields

  const [repInput, setRepInput] = useState([])

  // logic for creating new repertoire entry fields
  const addRepertoire = () => {
    console.log('in addRepertoire')
  }

  return (
    <Container component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
      General: {JSON.stringify(generalInfo)}
      <Stack direction = 'column' spacing={2}>
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
          onChange={e => setGeneral({ ...generalInfo, description: e.target.value })}
        />
        {repInput.map(num => {
          return <RepertoireItem key={num} generalInfo={generalInfo} setGeneral={setGeneral} />
        })}
        <Button
          size='small'
          color='inherit'
          sx={{ textAlign: 'right', typography: 'body2', mr: 1 }}
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setRepInput([...repInput, repInput.length + 1])}
        >add repertoire</Button>


        <Button sx={{ textAlign: 'right' }} type='submit'>save and create schedule</Button>
      </Stack>
    </Container>
  )
}
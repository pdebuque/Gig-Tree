/* 
this form should allow user to update 
  first name, 
  last name, 
  bio, 
  location, 
  instruments, 
  jobs/job locations, 
  profile picture
*/

import { Typography, Box, Button, TextField } from '@mui/material'
import modalStyle from './modalStyle'

//redux
import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';

export default function EditUserModal({ setEditOpen }) {

  const user = useSelector(store=>store.user)
  const [newInfo, setNewInfo] = useState(user)
  const textInputs = ['first name', 'last name', 'location', 'instrument 1', 'instrument 2', 'instrument 3','job 1', 'job 1 location', 'job 2', 'job 2 location']

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newInfo)
    dispatch({ type: 'EDIT_USER_INFO', payload: newInfo })
  }

  return (
    <Box component='form' onSubmit={handleSubmit} sx={modalStyle}>
      user: {JSON.stringify(user)}
      new info: {JSON.stringify(newInfo)}
      <Typography variant='h4'>edit user information</Typography>
      {textInputs.map(inputType => {
        return (
          <TextField
            key={inputType}
            type='text'
            id={`${inputType} input`}
            placeholder={inputType}
            value={newInfo[inputType.split(' ').join('_')]}
            onChange={e => setNewInfo({ ...newInfo, [inputType.split(' ').join('_')]: e.target.value })}
          />
        )
      })}
      <Button onClick={() => setEditOpen(false)}>cancel</Button>
      <Button type='submit'>submit</Button>
    </Box>
  )
}
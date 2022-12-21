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
//todo: improve the spacing/layout of the edit modal

import { Typography, Box, Button, TextField } from '@mui/material'
import modalStyle from '../../_style/modalStyle'

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
    console.log('user info to send: ', newInfo)
    dispatch({ type: 'EDIT_USER_INFO', payload: newInfo });
    setEditOpen(false);
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
      <TextField
        type='text'
        id = 'bio input'
        placeholder={newInfo.bio}
        multiline
        rows = {4}
        onChange={e=>setNewInfo({...newInfo, bio: e.target.value})}
        />
      <Button onClick={() => setEditOpen(false)}>cancel</Button>
      <Button type='submit'>submit</Button>
    </Box>
  )
}
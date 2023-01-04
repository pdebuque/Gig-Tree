import { Typography, Button, Container, Grid, TextField, InputAdornment, Stack } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchIcon from '@mui/icons-material/Search';
import CollaboratorItem from '../CollaboratorItem/CollaboratorItem';

export default function CreateInvite({ setTab }) {

  const dispatch = useDispatch();
  // newProject is temporary holding place for the current project
  const newProject = useSelector(store => store.newProject);

  const [invited, setInvited] = useState([...newProject.collaborators])
  const invitedIds = invited.map(user=>user.id)
  console.log('invited ids: ', invitedIds)
  // initialize search results with all users. future actions will filter
  const [searchResults, setSearchResults] = useState(useSelector(store => store.allUsers).filter(user=>!invitedIds.includes(user.id)));
  console.log('search results: ', searchResults)
  console.log('allUsers: ', useSelector(store => store.allUsers))

  // use local state to handle filtered searches
  // const [searchResults, setSearchResults] = useSelector(store=>) 


  /* 
  rethink columns of people in create/edit project:

  left side: search results. searchResults initializes as all users that have not been invited.

  right side: invited. initializes as newProject collaborators
  */


  const [searchTerm, setSearchTerm] = useState('');

  const filter = (e) => {
    setSearchTerm(e.target.value)
    setSearchResults([...searchResults].filter(collaborator => collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) || collaborator.instrument.toLowerCase()).includes(searchTerm.toLowerCase()))
  }

  const handleSubmit = () => {
    console.log('sending collaborators to redux');
    dispatch({ type: 'SET_COLLABORATORS', payload: invited })
    setTab(3)
  }

  const containerStyle = {
    overflow: 'hidden',
    overflowY: 'scroll',
    height: 400,
    outline: '1px solid red'

  }

  return (
    <Container>
      <Typography variant='h6'>invite collaborators</Typography>
      <TextField
        size='small'
        id="search-collab"
        placeholder="search by name or instrument"
        variant='outlined'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={searchTerm}
        onChange={filter}
      />
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Container sx={containerStyle}>
            {/* all collaborators here */}
            {JSON.stringify(searchResults.map(result=>result.id))}
            {searchResults.map(result => {
              return (<CollaboratorItem
              key = {result.id}
                collaborator={result}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                invited={invited}
                setInvited={setInvited}
              />)
            })}
          </Container>
        </Grid>
        <Grid item xs={4} sx = {containerStyle}>
          {/* invited collaborators here */}
          {JSON.stringify(invited.map(result=>result.id))}
          {invited.map(collaborator => {
            return (<CollaboratorItem
              key = {collaborator.id}
              collaborator={collaborator}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              invited={invited}
              setInvited={setInvited}
            />)
          })}
        </Grid>
      </Grid>
      <Button onClick={handleSubmit}>save and review</Button>
    </Container>
  )
}
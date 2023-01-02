import { Typography, Button, Container, Grid, TextField, InputAdornment } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchIcon from '@mui/icons-material/Search';
import CollaboratorItem from '../CollaboratorItem/CollaboratorItem';

export default function CreateInvite({ setTab }) {

  const dispatch = useDispatch();
  const newProject = useSelector(store => store.newProject);

  const [collaborators, setCollaborators] = useState(newProject.collaborators)

  const [invited, setInvited] = useState([])
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setCollaborators([...collaborators].filter(collaborator => collaborator.name.toLowerCase().includes(search.toLowerCase()) || collaborators.instrument.toLowerCase()).includes(search.toLowerCase()))
  }

  const handleSubmit = () => {
    console.log('sending collaborators to redux');
    dispatch({type: 'SET_COLLABORATORS', payload: collaborators})
    setTab(3)
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
        value={search}
        onChange={(e) => handleSearch(e)}
      />
      <Grid container spacing={1}>
        <Grid item xs={8}>
          {/* all collaborators here */}
          {collaborators.map(collaborator => {
            return (<CollaboratorItem collaborator={collaborator} />)
          })}
        </Grid>
        <Grid item xs={4}>
          {/* invited collaborators here */}
          {invited.map(collaborator => {
            return (<CollaboratorItem collaborator={collaborator} />)
          })}
        </Grid>
      </Grid>
      <Button onClick={handleSubmit}>save and review</Button>
    </Container>
  )
}
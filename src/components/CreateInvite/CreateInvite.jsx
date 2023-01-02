import { Typography, Button, Container, Grid, TextField, InputAdornment } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchIcon from '@mui/icons-material/Search';
import CollaboratorItem from '../CollaboratorItem/CollaboratorItem';

export default function CreateInvite({ setTab }) {

  // todo: need to find all available collaborators. do this through a redux-saga call

  useEffect(() => {
    console.log('useEffect: dispatch all users')
    dispatch({ type: 'FETCH_ALL_USERS' })
  }, [])

  const dispatch = useDispatch();
  const newProject = useSelector(store => store.newProject);

  // initialize search results with all users. future actions will filter
  const [searchResults, setSearchResults] = useState(useSelector(store => store.allUsers));

  // use local state to handle filtered searches
  // const [searchResults, setSearchResults] = useSelector(store=>) 

  const [collaborators, setCollaborators] = useState(newProject.collaborators)

  const [invited, setInvited] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setSearchResults([...searchResults].filter(collaborator => collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) || collaborator.instrument.toLowerCase()).includes(searchTerm.toLowerCase()))
  }

  const handleSubmit = () => {
    console.log('sending collaborators to redux');
    dispatch({ type: 'SET_COLLABORATORS', payload: collaborators })
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
        value={searchTerm}
        onChange={handleSearch}
      />
      <Grid container spacing={1}>
        <Grid item xs={8}>
          {/* all collaborators here */}
          {searchResults.map(result => {
            return (<CollaboratorItem collaborator={result} />)
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
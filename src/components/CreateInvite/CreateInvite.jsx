import { Typography, Button, Container, Grid, TextField, InputAdornment, Stack, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchIcon from '@mui/icons-material/Search';
import CollaboratorItem from '../CollaboratorItem/CollaboratorItem';

export default function CreateInvite({ setTab, invited, setInvited }) {

  // newProject is temporary holding place for the current project
  const newProject = useSelector(store => store.newProject);

  const invitedIds = invited.map(user => user.id)
  console.log('invited ids: ', invitedIds)
  // initialize search results with all users. future actions will filter

  //! invited: all users already invited to the project

  //! available users is all users who have not been invited
  const availableUsers = useSelector(store => store.allUsers).filter(user => !invitedIds.includes(user.id))

  //! searchResults is available users filtered by the search term (see filter())
  const [searchResults, setSearchResults] = useState(availableUsers);
  // console.log('search results: ', searchResults)
  // console.log('allUsers: ', useSelector(store => store.allUsers))

  //! search term is harvested from search field
  const [searchTerm, setSearchTerm] = useState('');

  //! filter function updates search results by filtering available users by the search term
  const filter = (e) => {
    setSearchTerm(e.target.value);
    console.log('filtering results by term: ', searchTerm)

    setSearchResults(availableUsers.filter(collaborator => {
      const searchLC = searchTerm.toLowerCase()

      const searchInfo = [
        collaborator.first_name || '',
        collaborator.last_name || '',
        collaborator.instrument_1 || '',
        collaborator.instrument_2 || '',
        collaborator.instrument_3 || ''
      ].map(el => el.toLowerCase())

      for (let info of searchInfo) {
        if (info.includes(searchLC)) return true
      }
      return false
    }))
    console.log('searchResults:', searchResults)
  }

  const containerStyle = {
    overflow: 'hidden',
    overflowY: 'scroll',
    height: 400,
  }

  return (
    <Container disableGutters>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant='h5'>Invite Collaborators</Typography>
        search term: {JSON.stringify(searchTerm)}
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
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Grid container spacing={1} sx={containerStyle} >
            {/* all collaborators here */}
            {/* {JSON.stringify(searchResults.map(result=>result.id))} */}
            {searchResults.map(result => {
              return (
                <Grid item xs={4}>
                  <CollaboratorItem
                    key={result.id}
                    collaborator={result}
                    searchResults={searchResults}
                    setSearchResults={setSearchResults}
                    invited={invited}
                    setInvited={setInvited}
                  />
                </Grid>)
            })}
          </Grid>
        </Grid>
        <Grid item xs={4} sx={containerStyle}>
          {/* invited collaborators here */}
          {/* {JSON.stringify(invited.map(result=>result.id))} */}
          {invited.map(collaborator => {
            return (<CollaboratorItem
              key={collaborator.id}
              collaborator={collaborator}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              invited={invited}
              setInvited={setInvited}
            />)
          })}
        </Grid>
      </Grid>
    </Container>
  )
}
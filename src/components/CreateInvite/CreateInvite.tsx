import { useState, useEffect } from 'react'

// library - functions
import { useSelector } from 'react-redux'

// library - components
import { Typography, Grid, TextField, InputAdornment, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

// internal - components
import CollaboratorItem from '../CollaboratorItem/CollaboratorItem';

// model
import { RootState } from '../../redux/reducers/_root.reducer'
import { UserT } from '../../model'

type Props = {
  setTab: React.Dispatch<React.SetStateAction<number>>,
  invited: UserT[],
  setInvited: React.Dispatch<React.SetStateAction<UserT[]>>,

}


const CreateInvite:React.FC<Props> = ({ setTab, invited, setInvited }) => {

  // newProject is temporary holding place for the current project
  const newProject = useSelector((store:RootState) => store.newProject);

  const invitedIds = invited.map(user => user.id)
  // console.log('invited ids: ', invitedIds)
  // initialize search results with all users. future actions will filter

  //! invited: all users already invited to the project

  //! available users is all users who have not been invited
  const availableUsers = useSelector((store:RootState) => store.allUsers).filter((user:UserT) => !invitedIds.includes(user.id))

  //! searchResults is available users filtered by the search term (see filter())
  const [searchResults, setSearchResults] = useState<UserT[]>(availableUsers);
  // console.log('search results: ', searchResults)
  // console.log('allUsers: ', useSelector(store => store.allUsers))

  //! search term is harvested from search field
  const [searchTerm, setSearchTerm] = useState<string>('');

  // execute filter whenever the search term changes
  useEffect(() => {
    filter(searchTerm)
  }, [searchTerm])

  const filter = (searchTerm:string) => {
    // console.log('filtering results by term: ', searchTerm)

    setSearchResults(availableUsers.filter((collaborator:UserT) => {
      const searchLC = searchTerm.toLowerCase()

      const searchInfo = [
        `${collaborator.first_name || ''} ${collaborator.last_name || ''}`,
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
    height: 450,
    overflow: 'hidden',
    overflowY: 'scroll',
    bgcolor: 'grey.50',
    borderRadius: 2
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginX: 2 }}>
              <Typography variant='h5'>Invite Collaborators</Typography>
              {/* search term: {JSON.stringify(searchTerm)} */}
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
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='h5' sx={{ marginX: 2 }}>invited</Typography>

          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Grid container spacing={1} sx={{ ...containerStyle, paddingRight: 1 }} >
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
        <Grid item xs={4} sx={{ ...containerStyle, bgcolor: 'white' }}>
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
    </Box>
  )
}

export default CreateInvite
import { Container, Typography, Button, Paper, Avatar, Box } from '@mui/material'

export default function CollaboratorItem({ collaborator, searchResults, setSearchResults, invited, setInvited }) {

  const collabStyle = {
    padding: 1,
    marginY: 1,
    backgroundColor: 'grey.50',
    overflow: 'hidden',
    overflowX: 'scroll'
  }

  // when a collaborator is clicked, move them: if they are remove that user from the 'searchResults array' and put them in the 'invited' array
  const handleClick = () => {
    console.log('clicked collaborator');
    if (searchResults.includes(collaborator)) {
      setInvited([...invited, collaborator]);
      setSearchResults([...searchResults].filter(result => result.id !== collaborator.id))
    }
    else {
      setSearchResults([...searchResults, collaborator]);
      setInvited([...invited].filter(result => result.id !== collaborator.id))
    }
  }

  const getInitials = (collaborator) => {
    if (!collaborator.last_name && !collaborator.first_name) return '??'
    if (!collaborator.last_name) return collaborator.first_name[0].toUpperCase()
    if (!collaborator.first_name) return collaborator.last_name[0].toUpperCase()
    return (collaborator.first_name[0] + collaborator.last_name[0]).toUpperCase()
  }

  // given a username, make a random color associated with it

  const stringToValue = (string) => {
    let sumValue = 0
    for (let i = 0; i < 4; i++) {
      sumValue += string.charCodeAt(string.length-i) || 0
    }
    return sumValue
  }

  const makeRandomColor = (username) => {
    const index = Math.floor((stringToValue(username) / 500) * 16777215).toString(16);
    return '#' + index
  }

  return (
    <Paper sx={collabStyle} onClick={handleClick}>
      <Box sx={{ display: 'flex', flexDirection: 'row', }}>
        {/* {JSON.stringify([collaborator.first_name, collaborator.last_name, collaborator.instrument_1, collaborator.instrument_2, collaborator.instrument_3])} */}
        {collaborator.prof_pic_path ?
          <Avatar alt = {`${collaborator.username}'s avatar`}src={collaborator.prof_pic_path} sx={{}}/>
          :
          <Avatar sx={{bgcolor: makeRandomColor(collaborator.username)}}>{getInitials(collaborator)}</Avatar>
        }

        <Box sx={{ marginLeft: 1 }}>
          <Typography variant='h6'>{collaborator.first_name} {collaborator.last_name}</Typography>
          <Typography variant='body2'>{collaborator.instrument_1 || 'musician'}{collaborator.instrument_2 && `, ${collaborator.instrument_2}`}{collaborator.instrumet_3 && `, ${collaborator.instrument_3}`}</Typography>
        </Box>
      </Box>
    </Paper>
  )
}
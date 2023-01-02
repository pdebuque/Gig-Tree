import { Typography, Button, Container, Grid, TextField, InputAdornment } from '@mui/material'
import {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';

export default function CreateInvite({ setTab }) {

  // eventually, initialize with redux
  const [collaborators,setCollaborators] = useState([])
  const [search,setSearch] = useState('');

  const handleSearch = (e) =>{
    setSearch(e.target.value)
  }

  return (
    <Container>
      <Typography variant='h6'>invite collaborators</Typography>
      <TextField
        size = 'small'
        id="search-collab"
        placeholder="search by name or instrument"
        variant= 'outlined'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value = {search}
        onChange = {(e)=>handleSearch(e)}
      />
      <Grid container spacing = {1}>
        <Grid item xs = {8}>
          results
        </Grid>
        <Grid item xs = {4}>
          invited
        </Grid>
      </Grid>
      <Button onClick={() => setTab(3)}>review</Button>
    </Container>
  )
}
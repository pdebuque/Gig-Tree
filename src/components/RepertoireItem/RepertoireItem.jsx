import { TextField, Container, Button } from '@mui/material';
import {useState} from 'react'

export default function RepertoireItem({ setGeneral, generalInfo }) {

const [thisPiece, setThisPiece] = useState({title:'', composer: ''})

  return (
    <Container>
      {JSON.stringify(thisPiece)}
      <TextField
        name='title-input'
        label='title'
        size='small'
        value = {thisPiece.title}
        onChange = {(e)=>setThisPiece({...thisPiece, title: e.target.value})}
      />
      <TextField
        name='composer-input'
        label='composer'
        size='small'
        value = {thisPiece.composer}
        onChange = {(e)=>setThisPiece({...thisPiece, composer: e.target.value})}
      />
      {/* on clicking this button, send this piece info into the generalInfo state held locally in create general */}
      <Button onClick={()=>setGeneral({...generalInfo, repertoire: [...generalInfo.repertoire, thisPiece]})}>save piece</Button>
    </Container>
  )
}
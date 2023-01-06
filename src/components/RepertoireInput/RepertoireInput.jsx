import { TextField, Container, Button, IconButton } from '@mui/material';
import { useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


export default function RepertoireItem({ setGeneral, generalInfo }) {

  const [thisPiece, setThisPiece] = useState({ name: '', composer: '' })

  return (
    <Container disableGutters>
      {/* {JSON.stringify(thisPiece)} */}
      <TextField
        name='title-input'
        label='title'
        size='small'
        value={thisPiece.name}
        onChange={(e) => setThisPiece({ ...thisPiece, name: e.target.value })}
      />
      <TextField
        name='composer-input'
        label='composer'
        size='small'
        value={thisPiece.composer}
        onChange={(e) => setThisPiece({ ...thisPiece, composer: e.target.value })}
      />
      {/* on clicking this button, send this piece info into the generalInfo state held locally in create general */}
      <IconButton onClick={() => {
        setGeneral({ ...generalInfo, repertoire: [...generalInfo.repertoire, thisPiece] });
        setThisPiece({name: '', composer: ''});
      }}>
        <AddCircleOutlineIcon />
      </IconButton>
    </Container>
  )
}
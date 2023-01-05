import {Container, IconButton, Paper} from '@mui/material';



export default function RepertoireItem({piece}) {
  return(
    <Container disableGutters>{piece.name} by {piece.composer}</Container>
  )
}
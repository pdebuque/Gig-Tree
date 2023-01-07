import { Container, IconButton, Paper, Typography, Grid, Box } from '@mui/material';
import { Delete } from '@mui/icons-material';



export default function RepertoireItem({ piece, gridWidth, generalInfo, setGeneral }) {

  const handleDelete = () =>{
    console.log('deleting this piece');
    setGeneral({...generalInfo, repertoire: generalInfo.repertoire.filter(el=>el.tempId!=piece.tempId)})
  }

  return (
    <Grid item xs={gridWidth}>
      {/* {JSON.stringify(piece)} */}

      <Paper sx={{ padding: 1, overflow: 'hidden', overflowX: 'scroll' }}>
        <Box sx = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Typography>
            {piece.name} by {piece.composer}
          </Typography>
          <IconButton sx = {{height: 24, width: 24, marginX: 1}} onClick = {handleDelete}>
            <Delete sx = {{height: 20}} />
          </IconButton>
        </Box>
      </Paper>
    </Grid>
  )
}
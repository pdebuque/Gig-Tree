import { IconButton, Paper, Typography, Grid, Box } from '@mui/material';
import { Delete } from '@mui/icons-material';

// model
import { PieceT, GeneralInfoT } from '../../model'

type Props = {
  piece: PieceT,
  gridWidth?: number,
  generalInfo?: GeneralInfoT,
  setGeneral?: React.Dispatch<React.SetStateAction<GeneralInfoT>>
}

const RepertoireItem: React.FC<Props> = ({ piece, gridWidth, generalInfo, setGeneral }) => {

  const handleDelete = () => {
    console.log('deleting this piece');
    if (setGeneral && generalInfo) {
    setGeneral({ ...generalInfo, repertoire: generalInfo.repertoire.filter(el => el.tempId != piece.tempId) })
  }
  }

  return (
    <Grid item xs={gridWidth}>
      {/* {JSON.stringify(piece)} */}

      <Paper sx={{ padding: 1, overflow: 'hidden', overflowX: 'scroll' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography>
            {piece.name} by {piece.composer}
          </Typography>

          {/* no delete functionality if we don't pass generalInfo and setGeneral */}
          {generalInfo && setGeneral &&
            <IconButton sx={{ height: 24, width: 24, marginX: 1 }} onClick={handleDelete}>
              <Delete sx={{ height: 20 }} />
            </IconButton>}
        </Box>
      </Paper>
    </Grid>
  )
}


export default RepertoireItem;
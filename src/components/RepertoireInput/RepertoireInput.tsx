import { TextField, Stack, IconButton } from '@mui/material';
import { useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// model

import { GeneralInfoT, PieceT } from '../../model';

type Props = {
  setGeneral: React.Dispatch<React.SetStateAction<GeneralInfoT>>,
  generalInfo: GeneralInfoT
}


const RepertoireItem = ({ setGeneral, generalInfo }: Props) => {

  const [thisPiece, setThisPiece] = useState<PieceT>({
    id: 0,
    name: '',
    composer: '',
    projectId: 0,
  })

  return (
    <Stack direction="row" spacing={2}>
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
        setThisPiece({
          id: 0,
          name: '',
          composer: '',
          projectId: 0,
        });
      }}>
        <AddCircleOutlineIcon />
      </IconButton>
    </Stack>
  )
}

export default RepertoireItem;
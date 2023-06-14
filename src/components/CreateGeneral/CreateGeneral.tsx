/* 
each step of the create project dialogue sends info to the store
*/

// library - functions
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Container, TextField, Stack, Grid } from '@mui/material';

// internal - components
import ColorPicker from '../_Assets/ColorPicker/ColorPicker'
import RepertoireContainer from '../RepertoireContainer/RepertoireContainer';

// model
import { RootState } from '../../redux/reducers/_root.reducer'
import { GeneralInfoT } from '../../model'

type Props = {
  // setTab: React.Dispatch<React.SetStateAction<number>>,
  generalInfo: GeneralInfoT,
  setGeneral: React.Dispatch<React.SetStateAction<GeneralInfoT>>
}

const CreateGeneral = ({generalInfo, setGeneral }: Props) => {

  const dispatch = useDispatch();

  // initialize 

  // saga will be necessary on the last page to send the info to the server. reducer will then receive an action to clear the state

  const newProject = useSelector((store: RootState) => store.newProject)


  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', paddingY: 2 }}>
      {/* General: {JSON.stringify(generalInfo)} */}
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Typography>general</Typography>
        </Grid>
        <Grid item xs={10}>
          <Stack direction='column' spacing={2} sx={{ marginBottom: 1 }}>

            <Stack direction='row' spacing={2} sx={{ display: 'flex', flexDirection: 'row', width: '100%', }}>
              <ColorPicker generalInfo={generalInfo} setGeneral={setGeneral} />
              <TextField
                sx={{ width: '45%' }}
                name='title-input'
                label='project name'
                size='small'
                value={generalInfo.name}
                onChange={e => setGeneral({ ...generalInfo, name: e.target.value })}
              />
              <TextField
                sx={{ width: '45%' }}
                name='ensemble-input'
                label='ensemble name'
                size='small'
                value={generalInfo.ensemble_name}
                onChange={e => setGeneral({ ...generalInfo, ensemble_name: e.target.value })}
              />
              {/* <Box sx = {{border: 1, borderColor: 'primary', height: 24, width: 24, backgroundColor: '#fff', borderRadius: '50%', margin: 1}}>
                
              </Box> */}
            </Stack>
            <TextField
              name='description-input'
              label='project description'
              size='small'
              multiline
              rows={3}
              value={generalInfo.description}
              onChange={e => setGeneral({ ...generalInfo, description: e.target.value })}
            />
          </Stack>
        </Grid>

        <Grid item xs={2}>
          <Typography>repertoire</Typography>
        </Grid>
        <Grid item xs={10}>
          <RepertoireContainer generalInfo={generalInfo} setGeneral={setGeneral} />
        </Grid>

      </Grid>
    </Container>
  )
}

export default CreateGeneral;
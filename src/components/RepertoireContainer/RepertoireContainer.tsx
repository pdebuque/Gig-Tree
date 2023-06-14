import RepertoireInput from '../RepertoireInput/RepertoireInput';
import { Container, Grid } from '@mui/material';
import RepertoireItem from '../RepertoireItem/RepertoireItem';

// model
import { GeneralInfoT } from '../../model';

type Props = {
  generalInfo: GeneralInfoT,
  setGeneral: React.Dispatch<React.SetStateAction<GeneralInfoT>>
}

const RepertoireContainer = ({ generalInfo, setGeneral }:Props) => {

  generalInfo?.repertoire.map((piece,i)=>{
    piece.tempId=i
  })

  return (
    <Container disableGutters>
      {/* {JSON.stringify(generalInfo.repertoire)} */}
      <RepertoireInput generalInfo={generalInfo} setGeneral={setGeneral} />
      <Grid container spacing={1} sx = {{padding: 1, marginY: 2, backgroundColor: '#fafafa'}}>

        {generalInfo.repertoire.map((piece) => <RepertoireItem generalInfo={generalInfo} setGeneral={setGeneral} piece={piece} key={piece.tempId} gridWidth={6} />)}

      </Grid>


    </Container>
  )
}

export default RepertoireContainer;
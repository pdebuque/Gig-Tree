import RepertoireInput from '../RepertoireInput/RepertoireInput';
import { useSelector } from 'react-redux'
import { Container, Grid } from '@mui/material';
import { useState } from 'react';
import RepertoireItem from '../RepertoireItem/RepertoireItem';


export default function RepertoireContainer({ generalInfo, setGeneral }) {

  return (
    <Container disableGutters>
      <RepertoireInput generalInfo={generalInfo} setGeneral={setGeneral} />
      <Grid container spacing={1} sx = {{padding: 1, marginY: 2, backgroundColor: '#fafafa'}}>
        {generalInfo.repertoire.map((piece, i) => <RepertoireItem piece={piece} key={i} />)}
      </Grid>


    </Container>
  )
}
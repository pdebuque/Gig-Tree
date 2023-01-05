import RepertoireInput from '../RepertoireInput/RepertoireInput';
import { useSelector } from 'react-redux'
import { Container } from '@mui/material';
import {useState} from 'react';
import RepertoireItem from '../RepertoireItem/RepertoireItem';


export default function RepertoireContainer({ generalInfo, setGeneral }) {

  return (
    <Container disableGutters>
      <RepertoireInput generalInfo={generalInfo} setGeneral={setGeneral} />

      {generalInfo.repertoire.map((piece,i) => <RepertoireItem piece = {piece} key = {i}/>)}

      
      
    </Container>
  )
}
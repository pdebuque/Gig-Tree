/* 
each step of the create project dialogue sends info to the store
*/

import { Typography, Container, Button, TextField, Stack, Box, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createContainerStyle } from '../../_style/modalStyle'
import { SketchPicker } from 'react-color';
import ColorPicker from '../ColorPicker/ColorPicker'

import RepertoireContainer from '../RepertoireContainer/RepertoireContainer';

export default function CreateReview({ generalInfo, setGeneral }) {

  const dispatch = useDispatch();

  // initialize 

  // saga will be necessary on the last page to send the info to the server. reducer will then receive an action to clear the state

  const newProject = useSelector(store => store.newProject)

  //todo: figure out color picker functions
  //todo: initialize colors in newProject
  //todo: logic to determine text color based on background color

  //todo: adjust POST to include colors


  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', paddingY: 2 }}>
      {/* General: {JSON.stringify(generalInfo)} */}
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Typography>general</Typography>
        </Grid>
        <Grid item xs={10}>
          <Stack direction='column' spacing={2} sx={{ marginBottom: 1 }}>

            <Stack direction = 'row' spacing = {2} sx={{ display: 'flex', flexDirection: 'row', width: '100%', }}>
              <ColorPicker generalInfo={generalInfo} setGeneral={setGeneral} />
              <TextField
                name='title-input'
                width='45%'
                label='project name'
                size='small'
                value={generalInfo.name}
                onChange={e => setGeneral({ ...generalInfo, name: e.target.value })}
              />
              <TextField
                name='ensemble-input'
                width='45%'
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
import { useSelector } from 'react-redux';

import { Box, Typography } from '@mui/material'

export default function ProjectPageGeneral() {

  const project = useSelector(store => store.currentProject)

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant='h5'>
        General
      </Typography>

      <Typography variant='h6'>
        About
      </Typography>
      <Typography variant='body1'>
        {project.description}
      </Typography>
      <Typography variant='h6'>
        Resources
      </Typography>
      <Typography variant='h6'>
        Repertoire
      </Typography>
      <Box>

        {project.repertoire.map(piece => {
          return (
            <Box>
              {piece.name}
            </Box>
          )
        })}
      </Box>


    </Box>
  )
}
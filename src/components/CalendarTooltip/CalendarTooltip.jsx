import { Modal, Box, Typography, IconButton, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom'

import { getDate, getTime } from '../../modules/formatTimes'


export default function CalendarTooltip({ eventModalOpen, setEventModalOpen, dateClicked, mousePos }) {

  const navigate = useNavigate()

  const {
    name,
    location,
    date,
    start,
    end,
    project_id,
    type,
    notes,
    project_name,
    ensemble_name,
    backgroundColor,
    color
  } = dateClicked

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant='h6'>
            {name || 'unnamed project'}
          </Typography>
          {project_name || ensemble_name &&
            <Box sx = {{marginLeft:1}}>
              <Typography variant='body2'>
                {project_name && project_name} {ensemble_name && `with ${ensemble_name}`}
              </Typography>
            </Box>
          }
        </Box>
        <IconButton sx={{ paddingTop: 0 }} onClick={() => setEventModalOpen(false)}>
          <CloseIcon color={dateClicked.backgroundColor} />
        </IconButton>
      </Box>
      <Box sx={{ marginLeft: .5 }}>
        <Typography variant='body2'>
          {location && `at ${location}.`} {getDate(date)}: {getTime(start)}-{getTime(end)}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: .5 }}>
        <Button
          size='small'
          color='inherit'
          sx={{ textAlign: 'right', typography: 'body2', mr: 1 }}
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate(`/project/${project_id}`)}
        >view project page</Button>
      </Box>

      {/* {JSON.stringify(dateClicked)} */}
      {/* {JSON.stringify(mousePos)} */}

    </Box>
  )
}
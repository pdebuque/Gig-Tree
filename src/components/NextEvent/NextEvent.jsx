import { Box, Typography, Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

import { getDate, getTime } from '../../modules/formatTimes'




export default function NextEvent() {

  const nextDate = useSelector(store => store.nextDate)
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
  } = nextDate

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', overflow: 'hidden' }}>
        <Typography variant='h5'>next event</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            size='small'
            color='inherit'
            sx={{ textAlign: 'right', typography: 'body2', mr: 1 }}
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate(`/project/${project_id}`)}
          >project page</Button>
        </Box>
      </Box>
      <Box sx={{height: 60,  marginX: 2, mt: 1, paddingLeft: 1.5, paddingY: .5, borderRadius: 2, borderLeft: 8, bgcolor: 'grey.100', borderColor: nextDate.backgroundColor, overflow: 'hidden', }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

          <Box>
            <Typography variant='h6'>
              {name || 'unnamed date'}
            </Typography>
            {project_name || ensemble_name &&
              <Box sx={{ marginLeft: 1 }}>
                <Typography variant='body2'>
                  {project_name && project_name} {ensemble_name && `with ${ensemble_name}`}
                </Typography>
              </Box>
            }
          </Box>
        </Box>
        <Box>
          
          <Typography variant='body2'>
            {location && `at ${location}.`} {date && `${getDate(date)}: ${getTime(start)}-${getTime(end)}`}
          </Typography>
        </Box>
      </Box>
      {/* {JSON.stringify(dateClicked)} */}
      {/* {JSON.stringify(mousePos)} */}

    </Box>
  )
}
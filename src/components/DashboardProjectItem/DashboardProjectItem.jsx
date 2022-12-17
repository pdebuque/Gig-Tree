/* 
This component is a single project displayed within the dashboard projects sidebar
*/

//todo: item colors
//todo: background colors conditional on date: past-grey; upcoming: light yellow; current: light green

//todo: avatars

//todo: sort by date

import { listItemStyle } from '../../_style/listItemStyle.jsx'
import { Box, Typography, Collapse, Button} from '@mui/material';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import './DashboardProjectItem.css'

export default function DashboardProjectItem({ project }) {

  const navigate=useNavigate();
  const [isCollapsed, setCollapsed] = useState(false)

  return (
    <Box
      className='project-item'
      sx={listItemStyle}
      onClick={() => setCollapsed(!isCollapsed)}
    >
      <Box sx = {{ml: 1}}>
        <Typography variant='h6'>{project.name}</Typography>
        <Typography variant='subtitle2'>with {project.ensemble_name}</Typography>
      </Box>
      <Collapse
        in={isCollapsed}
      >
        <Box sx={{ ml: 3, pl: 1, marginY: 1, typography: 'body2', borderLeft: 3, borderColor: 'grey.300', backgroundColor: 'grey.50' }}>
          {project.description}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            size='small'
            color='inherit'
            sx={{ textAlign: 'right', typography: 'body2', mr: 1 }}
            endIcon = {<ArrowForwardIcon />} 
            onClick={()=>navigate(`/project/${project.id}`)}
          >view project page</Button>
        </Box>
      </Collapse>
    </Box>
  )

}
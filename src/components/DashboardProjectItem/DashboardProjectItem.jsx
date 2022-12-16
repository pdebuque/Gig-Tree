/* 
This component is a single project displayed within the dashboard projects sidebar
*/

import {Box, Typography, Collapse} from '@mui/material'

export default function DashboardProjectItem({project}) {
return(
<Box>
  <Typography>{project.name}</Typography>
</Box>
)

}
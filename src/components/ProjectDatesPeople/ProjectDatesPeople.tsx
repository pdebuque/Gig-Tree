import { useSelector } from 'react-redux';
import { Box, Paper, Tabs, Tab } from '@mui/material'
import TabPanel from '../_Assets/TabPanel/TabPanel';
import { useState } from 'react'
import ProjectPageDates from '../ProjectPageDates/ProjectPageDates';
import ProjectPagePeople from '../ProjectPagePeople/ProjectPagePeople'

// model
// import { RootState } from '../../redux/reducers/_root.reducer';


export default function ProjectDatesPeople() {

  // const project = useSelector((store:RootState) => store.currentProject)

  const [tabValue, setTab] = useState(0)

  return (
    <Paper sx={{ p: 2, height: 600 }}>
      <Box sx={{ paddingX: 3, mt: 0 }}>

        <Tabs
          sx = {{size: 'small'}}
          value={tabValue}
          onChange={(e, value) => setTab(value)}
          centered
        >
          <Tab label="dates" />
          <Tab label="people" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <ProjectPageDates />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <ProjectPagePeople />
      </TabPanel>
    </Paper>
  )
}
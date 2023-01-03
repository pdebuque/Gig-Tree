/* 
create project takes inputs for project name, ensemble, dates, owner, repertoire, general notes

multitab layout
    - tab 1: general info: project name, ensemble, notes
    - tab 2: create rehearsal schedule
    - tab 3: invite collaborators
    - tab 4: review/submit

save all into redux store as newProject

---- UPDATE ----
  - CreateProject component has only the header and tab panel
  - Each tab is its own component
    - CreateGeneral
    - CreateSchedule
    - CreateInvite
    - CreateReview

*/

import { useState, useEffect } from 'react'
import Calendar from 'react-calendar';
import { Box, Tabs, Tab, Grid, Paper, Typography, Container } from '@mui/material';
import './calendar.css';
import { useDispatch, useSelector } from 'react-redux';

import TabPanel from '../_Assets/TabPanel/TabPanel'
import CreateGeneral from '../CreateGeneral/CreateGeneral';
import CreateSchedule from '../CreateSchedule/CreateSchedule';
import CreateInvite from '../CreateInvite/CreateInvite';
import CreateReview from '../CreateReview/CreateReview';

export default function CreateProject() {

  const dispatch = useDispatch();
  const newProject = useSelector(store => store.newProject)

  useEffect(() => {
    console.log('useEffect: dispatch all users')
    dispatch({ type: 'FETCH_ALL_USERS' })
  }, [])



  // const sampleDates = ['12/5/2022'];
  const [tabValue, setTab] = useState(0);

  // const [newProject, setProject] = useState({});
  // const [date, setDate] = useState('');

  const handleClick = (value) => {
    console.log(value)
    // setDate(value)
  }

  // render a tabgroup component and several tab pages, each corresponding to a separate step in the event creation process

  const steps = [<CreateGeneral setTab={setTab} />, <CreateSchedule setTab={setTab} />, <CreateInvite setTab={setTab} />, <CreateReview setTab={setTab} />]



  return (
    <Container>
      <Typography variant='h5'>Create new project</Typography>
      <Box sx={{ paddingX: 3, mt: 2 }}>

        <Tabs
          value={tabValue}
          onChange={(e, value) => setTab(value)}
          size='small'
          centered
        >
          <Tab label="general" />
          <Tab label="schedule" />
          <Tab label="invite" />
          <Tab label="review" />
        </Tabs>
      </Box>

      {steps.map((step, i) => {
        return (
          <TabPanel key={i} value={tabValue} index={i}>
            {step}
          </TabPanel>
        )
      })}


    </Container>
  )
}
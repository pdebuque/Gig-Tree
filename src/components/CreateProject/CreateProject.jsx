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
import { Box, Tabs, Tab, Grid, Paper, Typography, Container, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './calendar.css';
import { useDispatch, useSelector } from 'react-redux';

import TabPanel from '../_Assets/TabPanel/TabPanel'
import CreateGeneral from '../CreateGeneral/CreateGeneral';
import CreateSchedule from '../CreateSchedule/CreateSchedule';
import CreateInvite from '../CreateInvite/CreateInvite';
import CreateReview from '../CreateReview/CreateReview';

export default function CreateProject({ createMode, setCreateOpen }) {

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

  const handleClose = () => {
    setCreateOpen(false);
    dispatch({ type: 'SET_NEW_PROJECT', payload: { name: '', ensemble_name: '', description: '', backgroundColor: '#7e1f89', color: '#ffffff', repertoire: [], dates: [], collaborators: [] } })
  }

  // render a tabgroup component and several tab pages, each corresponding to a separate step in the event creation process

  // local state info to send to redux in handleSubmit
  const [generalInfo, setGeneral] = useState({ name: newProject.name, ensemble_name: newProject.ensemble_name, description: newProject.description, repertoire: newProject.repertoire, backgroundColor: newProject.backgroundColor, color: newProject.color || [] })

  const [dates, setDates] = useState([...newProject.dates] || [])

  const [invited, setInvited] = useState([...newProject.collaborators] || [])

  // steps array allows us to iterate through the steps of project creation
  const steps = [{
    name: 'create-general',
    tabValue: 0,
    tabComponent: <CreateGeneral setTab={setTab} generalInfo={generalInfo} setGeneral={setGeneral} />,
    buttonText: 'save and create schedule',
    buttonFunction: () => {
      dispatch({ type: 'SET_GENERAL', payload: generalInfo })
      setTab(1)
    },
  },
  {
    name: 'create-schedule',
    tabValue: 1,
    tabComponent: <CreateSchedule setTab={setTab} dates={dates} setDates={setDates} />,
    buttonText: 'save and invite collaborators',
    buttonFunction: () => {
      console.log('submitting dates to redux')
      dispatch({ type: 'SET_SCHEDULE', payload: dates })
      setTab(2);
    }
  },
  {
    name: 'create-invite',
    tabValue: 2,
    tabComponent: <CreateInvite setTab={setTab} invited={invited} setInvited={setInvited} />,
    buttonText: 'save and review',
    buttonFunction: () => {
      console.log('sending collaborators to redux');
      dispatch({ type: 'SET_COLLABORATORS', payload: invited })
      setTab(3)
    }
  },
  {
    name: 'create-review',
    tabValue: 3,
    tabComponent: <CreateReview setTab={setTab} />,
    buttonText: 'submit project',
    buttonFunction: () => {
      // console.log('submitting project');
      if (createMode) {
        dispatch({ type: 'ADD_PROJECT', payload: newProject })
      }
      else {
        dispatch({ type: 'EDIT_PROJECT', payload: newProject })
      }
      setCreateOpen(false);
    }
  }
  ]

  return (
    <Container>
      {/* {JSON.stringify(newProject)} */}
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h5'>{createMode ? 'Create new project' : `Edit project - ${newProject.name}`}</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon color='primary' />
        </IconButton>
      </Box>
      <Box sx={{ paddingX: 3, mt: 0 }}>

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

      {steps.map((step) => {
        return (
          <TabPanel key={step.tabValue} value={tabValue} index={step.tabValue}>
            <Box id={`${step.name}-container`} sx={{ height: 500, padding: 0, overflow: 'hidden', overflowY: 'scroll' }}>
              {step.tabComponent}
            </Box>
            <Button textAlign='right' onClick={step.buttonFunction}>
              {step.buttonText}
            </Button>
          </TabPanel>
        )
      })}

    </Container>
  )
}
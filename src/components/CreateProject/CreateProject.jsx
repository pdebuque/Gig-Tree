/* 
create project takes inputs for project name, ensemble, dates, owner, repertoire, general notes

multitab layout
    - tab 1: general info: project name, ensemble, notes
    - tab 2: create rehearsal schedule
    - tab 3: invite collaborators
    - tab 4: review/submit

save all into redux store as newProject
    - 
);

*/

import { useState } from 'react'
import Calendar from 'react-calendar';
import { Box, Tabs, Tab, Grid, Paper } from '@mui/material';
import './calendar.css';
import { useDispatch } from 'react-redux';
import TabPanel from '../_Assets/TabPanel/TabPanel'

export default function CreateProject() {

  // const sampleDates = ['12/5/2022'];
  const [tabValue, setTab] = useState(0);

  const [newProject, setProject] = useState({});
  const [date, setDate] = useState('');

  const handleClick = (value) => {
    console.log(value)
    setDate(value)
  }

  // render a tabgroup component and several tab pages, each corresponding to a separate step in the event creation process


  return (
    <main>
      <h1>Create new project</h1>
      {/* <form className="new-project-form">
                <label htmlFor="name-input">project name</label>
                <input
                    type="text"
                    onChange={e => setProject({ ...newProject, name: e.target.value })}
                    value={newProject.name}
                />
                <label htmlFor="name-input">ensemble</label>
                <input
                    type="text"
                    onChange={e => setProject({ ...newProject, ensemble: e.target.value })}
                    value={newProject.ensemble}
                />
                <label htmlFor="name-input">project name</label>
                <button type='submit'>submit project</button>
            </form> */}
      {/* <Box sx={{ marginY: 2, marginX: 5 }} className='calendar'>
                        <Calendar
                            onClickDay={(value) => handleClick(value)}
                            value={date}
                        />
            </Box> */}
      <Paper sx={{ paddingX: 3, mt: 2 }}>
        <Box>
          <Tabs
            value={tabValue}
            onChange={(e, value) => setTab(value)}
          >
            <Tab label="overview" />
            <Tab label="schedule" />
            <Tab label="invite" />
            <Tab label="review" />
          </Tabs>
          <TabPanel
            value={tabValue}
            index={0}
          >
            hello
          </TabPanel>
        </Box>
      </Paper>

    </main>
  )
}
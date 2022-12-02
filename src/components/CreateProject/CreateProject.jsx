/* 
create project takes inputs for project name, ensemble, dates, poster

possible features:
    - use project templates
    - 


*/


import { useState } from 'react'
import Calendar from 'react-calendar';
import { Box } from '@mui/material';
import './calendar.css'

export default function CreateProject() {

    const sampleDates = ['12/5/2022'];

    const [newProject, setProject] = useState({})
    const [date, setDate] = useState('')

    const handleClick = (value) => {
        console.log(value)
        setDate(value)
    }


    return (
        <main>
            <h1>Create new project</h1>
            <form className="new-project-form">
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
            </form>
            <Box sx={{ marginY: 2, marginX: 5 }} className='calendar'>
                        <Calendar
                            onClickDay={(value) => handleClick(value)}
                            value={date}
                        />
            </Box>

        </main>
    )
}
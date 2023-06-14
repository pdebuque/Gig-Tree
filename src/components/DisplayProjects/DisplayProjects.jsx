import { Calendar } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Box, Grid } from '@mui/material';
import { useState, useCallback } from 'react'

// get events from a js module. eventually, will get from database.
/* events is an array of objects; each event is structured: 
{
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
    hex: '#023047'
  }

*/

import events from '../../events_'

export default function DisplayProjects() {

    const DnDCalendar = withDragAndDrop(Calendar);
    const localizer = momentLocalizer(moment);
    const [myEvents, setMyEvents] = useState(events)


    const moveEvent = useCallback(
        ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
            const { allDay } = event
            if (!allDay && droppedOnAllDaySlot) {
                event.allDay = true
            }

            setMyEvents((prev) => {
                const existing = prev.find((ev) => ev.id === event.id) ?? {}
                const filtered = prev.filter((ev) => ev.id !== event.id)
                return [...filtered, { ...existing, start, end, allDay }]
            })
        },
        [setMyEvents]
    )

    const resizeEvent = useCallback(
        ({ event, start, end }) => {
            setMyEvents((prev) => {
                const existing = prev.find((ev) => ev.id === event.id) ?? {}
                const filtered = prev.filter((ev) => ev.id !== event.id)
                return [...filtered, { ...existing, start, end }]
            })
        },
        [setMyEvents]
    )

    const handleSelectEvent = useCallback(
        (event) => {
            console.log(event.title)
        }, [])

    const handleSelectSlot = useCallback(
        ({ start, end }) => {
            const title = window.prompt('New Event name')
            if (title) {
                setMyEvents((prev) => [...prev, { start, end, title }])
            }
        },
        [setMyEvents]
    )

    const getEventStyles = (event) => {

        const style = {
            backgroundColor: event.hex,
            borderRadius: '6px',
            opacity: 0.8,
            color: event.text,
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }

    return (
        <main>
            <Box sx={{ textAlign: 'center' }}>
                <h2>Current Projects</h2>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={3}>list of projects will go here</Grid>
                <Grid item xs={9}>
                    <Box sx={{ height: 700 }} >
                        <DnDCalendar
                            localizer={localizer}
                            events={myEvents}
                            onEventDrop={moveEvent}
                            onEventResize={resizeEvent}
                            onSelectEvent={handleSelectEvent}
                            onSelectSlot={handleSelectSlot}
                            selectable
                            draggableAccessor={(event) => true}
                            eventPropGetter={getEventStyles}
                        />
                    </Box>
                </Grid>
            </Grid>
        </main>
    )
}
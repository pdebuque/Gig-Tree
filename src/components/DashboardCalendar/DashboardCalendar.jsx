/* 
this component is the calendar sidebar in the dashboard.

it will get all of the user's project dates from the server and render a react-big-calendar
*/
import { Calendar } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Box, Grid, Typography } from '@mui/material';
import { useState, useCallback } from 'react'


import events from '../../events';

export default function DashboardCalendar() {

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



    <Box>
      <Typography variant='h5' sx={{mb: 2}}>Upcoming</Typography>
      <Box sx={{height:500}}>
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
    </Box>
  )
}
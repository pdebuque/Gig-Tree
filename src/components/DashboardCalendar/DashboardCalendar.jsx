/* 
this component is the calendar sidebar in the dashboard.

it will get all of the user's project dates from the server and render a react-big-calendar
*/

//calendar imports
import { Calendar } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Box, Typography, Modal } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import CalendarTooltip from '../CalendarTooltip/CalendarTooltip';

// import events from '../../events';

export default function DashboardCalendar() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_PROJECTS' })
  }, [])

  const initialDates = useSelector(store => store.dates)

  // extract dates from projects
  const [dates, setDates] = useState(initialDates)
  const [eventModalOpen, setEventModalOpen] = useState(true)
  const [mousePos, setMousePos] = useState([0, 0])
  const [dateClicked, setDateClicked] = useState({})


  useEffect(() => {
    setDates(initialDates)
  }, [initialDates])

  const DnDCalendar = withDragAndDrop(Calendar);
  const localizer = momentLocalizer(moment);


  // const moveEvent = useCallback(
  //   ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
  //     const { allDay } = event
  //     if (!allDay && droppedOnAllDaySlot) {
  //       event.allDay = true
  //     }

  //     setDates((prev) => {
  //       const existing = prev.find((ev) => ev.id === event.id) ?? {}
  //       const filtered = prev.filter((ev) => ev.id !== event.id)
  //       return [...filtered, { ...existing, start, end, allDay }]
  //     })
  //   },
  //   [setDates]
  // )

  // const resizeEvent = useCallback(
  //   ({ event, start, end }) => {
  //     setDates((prev) => {
  //       const existing = prev.find((ev) => ev.id === event.id) ?? {}
  //       const filtered = prev.filter((ev) => ev.id !== event.id)
  //       return [...filtered, { ...existing, start, end }]
  //     })
  //   },
  //   [setDates]
  // )

  const handleSelectEvent = useCallback(
    (date, event) => {
      // const dateObj = new Date(date.date)
      // const startObj = new Date(date.start)
      // const endObj = new Date(date.end)
      // console.log(`${date.title}: ${date.date} from ${date.start}-${date.end}`);
      // console.log(`clientX: ${event.clientX}; clientY: ${event.clientY}`);
      setMousePos([event.clientX, event.clientY]);
      setDateClicked(date);
      setEventModalOpen(true);
    }, [])


  // const handleSelectSlot = useCallback(
  //   ({ start, end }) => {
  //     const title = window.prompt('New Event name')
  //     if (title) {
  //       setDates((prev) => [...prev, { start, end, title }])
  //     }
  //   },
  //   [setDates]
  // )

  const getEventStyles = (event) => {

    const style = {
      backgroundColor: event.backgroundColor,
      borderRadius: '6px',
      opacity: 0.8,
      color: event.color,
      border: '0px',
      display: 'block'
    };
    return {
      style: style
    };
  }

  return (
    <Box>
      {/* {JSON.stringify(dates[0])};
      <br/>
      type of date: {typeof dates[0].date}
      <br/>
      type of start: {typeof dates[0].start} <br/>
      type of end: {typeof dates[0].end} <br/>  */}
      {/* type of date element: {typeof dates[0].date} */}
      <Typography variant='h5' sx={{ mb: 2 }}>Upcoming</Typography>
      {/* dates: {JSON.stringify(dates)} */}
      {/* projects: {JSON.stringify(projects)} */}
      <Box sx={{ height: 600 }}>
        <DnDCalendar
          localizer={localizer}
          events={dates}
          // onEventDrop={moveEvent}
          // onEventResize={resizeEvent}
          onSelectEvent={handleSelectEvent}
          // onSelectSlot={handleSelectSlot}
          selectable
          // draggableAccessor={(event) => true}
          eventPropGetter={getEventStyles}
        />
      </Box>
      <CalendarTooltip 
        eventModalOpen = {eventModalOpen} 
        setEventModalOpen={setEventModalOpen} 
        dateClicked={dateClicked}
        mousePos={mousePos}
        />
      
    </Box>
  )
}
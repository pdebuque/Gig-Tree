/* 
this component is the calendar sidebar in the dashboard.

it will get all of the user's project dates from the server and render a react-big-calendar
*/
import { useState, useCallback, useEffect } from 'react';

// library - functions
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// library - components
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { luxonLocalizer } from 'react-big-calendar';
import { Calendar } from 'react-big-calendar'
import { Box, Typography, Modal } from '@mui/material';

// internal - components
import CalendarTooltip from '../CalendarTooltip/CalendarTooltip';


// model
// import DateT from '../../model'

// import events from '../../events';

export default function DashboardCalendar() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_PROJECTS' })
  }, [])

  const initialDates = useSelector(store => store.dates)

  // extract dates from projects
  const [dates, setDates] = useState(initialDates)
  const [eventModalOpen, setEventModalOpen] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 200, y: 200 })
  const [dateClicked, setDateClicked] = useState({
  })

  useEffect(() => {
    setDates(initialDates)
  }, [initialDates])

  const DnDCalendar = withDragAndDrop(Calendar);
  const localizer = momentLocalizer(moment);

  const handleSelectEvent = useCallback(
    (date, event) => {
      console.log(`selected event:`, date)
      // console.log('hello')
      setMousePos({ x: event.clientX, y: event.clientY });

      setDateClicked(date);
      setEventModalOpen(true);
    }, [])


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

  const getTransform = (position) => {
    // mousePos: [x,y]
    // bottom right corner
    if (position.x > 1200 && position.y > 900) return 'translate(-5%,-5%)';
    // bottom
    if (position.x > 1200) return 'translate(-95%,-105%)';
    // right
    if (position.y > 750) return 'translate(-5%,-105%)';
    // else
    return 'translate(-5%,5%)'
  }

  const calendarModalStyle = {
    position: 'absolute',
    transform: getTransform(mousePos),
    top: mousePos.y,
    left: mousePos.x,
    width: 300,
    bgcolor: 'background.paper',
    borderRadius: 2,
    borderTop: 10,
    // borderBottom: 10,
    borderColor: dateClicked.backgroundColor,
    padding: 1,
    boxShadow: 5
  }

  return (
    <Box>
      {/* mousePos: {JSON.stringify(mousePos)} */}
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
      <Box sx={{ height: 560 }}>
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
      <Modal
        open={eventModalOpen}
        hideBackdrop={true}
        onClose={()=>setEventModalOpen(false)}
      >
        <Box sx={calendarModalStyle}>
          <CalendarTooltip
            eventModalOpen={eventModalOpen}
            setEventModalOpen={setEventModalOpen}
            dateClicked={dateClicked}
            mousePos={mousePos}
          />
        </Box>
      </Modal>

    </Box>
  )
}
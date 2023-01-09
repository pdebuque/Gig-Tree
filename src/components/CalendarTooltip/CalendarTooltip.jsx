import {Modal, Box, Typography} from '@mui/material'

export default function CalendarTooltip({eventModalOpen, setEventModalOpen, dateClicked, mousePos}) {

  const getTransform = (position) => {
    // bottom right corner
    if (mousePos[0]>1200 && mousePos[1]>900) return 'translate(-95%,-105%)';
    // bottom
    if (mousePos[0]>1200) return 'translate(-5%,-105%)';
    // right
    if (mousePos[1]>900) return 'translate(-95%,5%)';
    // else
    return 'translate(-5%,5%)'
  }

  const calendarModalStyle = {
    position: 'abolute',
    transform: getTransform({mousePos}),
    top: mousePos[1],
    left: mousePos[0],
    width: 300,
    height: 200
  }

  return(
    <Modal
      open={eventModalOpen}
      sx = {calendarModalStyle}
    >
        <Box>
          {JSON.stringify(dateClicked)}
          <br/>
          {JSON.stringify(mousePos)}
      </Box>
    </Modal>
  )
}
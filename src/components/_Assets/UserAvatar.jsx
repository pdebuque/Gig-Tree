import React, { useState } from 'react';

// libary - function

// library - component
import { Box, Avatar, Modal, Tooltip, Button } from '@mui/material'

// internal - component

// internal - other
import {getTransform} from '../../modules/getTransform'


/* 
goal: fully accessibility-enabled avatar component

- 

!todo: hover functionality?

*/

export default function UserAvatar(props) {

  const {
    user,
    height,
    width,
    tooltipText
  } = props;

  const [mousePos, setMousePos] = useState({ x: '', y: '' })
  const [modalOpen, setModalOpen] = useState(false)

  //* =========== avatar styling functions ===============

  const getInitials = (user) => user?.first_name[0].toUpperCase() + user?.last_name[0].toUpperCase();

  const stringToValue = (string) => {
    let sumValue = 0;
    for (let i = 0; i < 4; i++) {
      sumValue += string.charCodeAt(string.length - 1) || 0
    }
    return sumValue
  }

  const makeRandomColor = (user) => {
    const index = Math.floor((stringToValue(user?.username) / 500) * 16777215).toString(16);
    return '#' + index
  }

  const avatarStyle = {
    height: height,
    width: width,
    bgcolor: makeRandomColor(user)
  }



  //* ================= modal styling functions ================

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

  const modalStyle = {
    position: 'absolute',
    transform: 'translate(-5%, 5%)',
    width: 180,
    height: 64,
    borderRadius: 2,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: 2,
  }

  //* ================== component functions =================

  const handleAvatarClick = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    console.log(mousePos)
    setModalOpen(true);
  }

  return (
    <>
      <Tooltip title={tooltipText}>
        <Button
          sx={{ padding: 0 }}
          onClick={handleAvatarClick}>
          {user?.prof_pic_path ?
            <Avatar
              alt={`${user.username}'s avatar`}
              src={user.prof_pic_path}
              sx={{ ...avatarStyle }} />
            :
            <Avatar
              alt={`${user.username}'s placeholder avatar`}
              sx={{ ...avatarStyle }}
            >
              {getInitials(user)}
            </Avatar>
          }
        </Button>
      </Tooltip>


      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Box sx={{ ...modalStyle, top: mousePos.y, left: mousePos.x, boxShadow: 5, transform: getTransform(mousePos) }}>

        </Box>

      </Modal>
    </>
  )
}

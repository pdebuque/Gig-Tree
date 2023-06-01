/* 
this component is the projects sidebar in the dashboard.

it will get all of the projects that user is on and that user owns from the server and map them into individual project components
*/

// library - functions
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

// library - components
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Typography, IconButton, Modal, Container, Button, Menu, MenuItem } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

// internal - components
import DashboardProjectItem from '../DashboardProjectItem/DashboardProjectItem';
import CreateProject from '../CreateProject/CreateProject';

// internal - other
import sortProjects from '../../modules/sortFunctions'
import { largeModal } from '../../_style/modalStyle'
import { greyBoxStyle } from '../../_style/greyBoxStyle';


export default function DashboardProjects() {

  const user = useSelector(store => store.user)

  // get the user's projects from the store
  const projects = useSelector(store => store.project);

// for menu open/close
  const [createOpen, setCreateOpen] = useState(false)
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openFilterMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeFilterMenu = () => {
    setAnchorEl(null)
  }

  const [sortMode, setSortMode] = useState({
    ascending: false,
    filter: 'all', // starred, past/upcoming/ongoing, owned
    sortBy: 'date' //starred, date, owned
  })

  // this dictates create or edit mode of the entire project creation modal
  const [createMode, setCreateMode] = useState(true)

  const filterOptions = [
    {
      type: 'all',
    },
    {
      type: 'starred',
    },
    {
      type: 'owned',
    },
    {
      type: 'accepted',
    },
    {
      type: 'pending',
    },
    
  ]

let projectsDisplayed = sortProjects(projects, user, sortMode);

  return (
    <Container sx={{ paddingBottom: 2, }} >
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography variant='h5'>
            Projects
          </Typography>
          <IconButton
            aria-label="add-project"
            onClick={() => {
              setCreateMode(true)
              setCreateOpen(true)
            }}>
            <ControlPointIcon />
          </IconButton>
        </Box>
        <Box>
          <Button 
            sx={{ textTransform: 'none', color: 'grey.700' }} 
            endIcon={sortMode.ascending ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            onClick={() => {
              console.log('changing ascending')
              sortMode.ascending ?
              setSortMode({ ...sortMode, ascending: false })
              :
              setSortMode({...sortMode, ascending: true})
            }}
            aria-label="sort mode"
          >
            {sortMode.sortBy}
          </Button>

          <Button
            sx={{ textTransform: 'none', color: 'grey.700' }}
            endIcon={<FilterListIcon />}
            onClick={(e)=>{
              openFilterMenu(e)
            }}
          >
            {sortMode.filter}
          </Button>
        </Box>
    
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={closeFilterMenu}
        >
          {filterOptions.map((option, i) => {
            return (
              <MenuItem
                key={i}
                onClick={() => {
                  setSortMode({ ...sortMode, filter: option.type })
                  closeFilterMenu()
                }}
              >
                <Box sx={{ display: 'flex', width: 100 }}>
                  <Box sx={{ width: 20 }}>{sortMode.filter === option.type ? '✓' : '-'}</Box>
                  {option.type}
                </Box>
              </MenuItem>
            )
          })}
        </Menu>
      </Box>
      <Box sx={{ ...greyBoxStyle, height: 540 }}>
        {projectsDisplayed.map(project => {
          return (
            <DashboardProjectItem
              key={project.id}
              project={project}
              setCreateOpen={setCreateOpen}
              setCreateMode={setCreateMode}
            />
          )
        })}
        
      </Box>
      <Modal
        open={createOpen}
      >
        <Box sx={largeModal}>
          <CreateProject createMode={createMode} setCreateOpen={setCreateOpen} />
        </Box>
      </Modal>


    </Container >
  )
}
/* 
this component is the projects sidebar in the dashboard.

it will get all of the projects that user is on and that user owns from the server and map them into individual project components
*/
import { insetStyle } from '../../_style/projectStyle'
import DashboardProjectItem from '../DashboardProjectItem/DashboardProjectItem';
import DeleteProjectModal from '../DeleteProjectModal/DeleteProjectModal'
import CreateProject from '../CreateProject/CreateProject';

import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, IconButton, Modal, Container, Button, Switch, Menu, MenuItem } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useEffect, useState } from 'react';
import { largeModal } from '../../_style/modalStyle'
import { sortByStarred, sortByFirstAsc, sortByFirstDesc } from '../../modules/sortFunctions';
import { greyBoxStyle } from '../../_style/greyBoxStyle';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import sortProjects from '../../modules/sortFunctions'

export default function DashboardProjects() {

  const user = useSelector(store => store.user)

  // get the user's projects from the store
  const projects = useSelector(store => store.project);
  const [projectsDisplayed, setProjectsDisplayed] = useState(projects)
  const [createOpen, setCreateOpen] = useState(false)
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const openFilterMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeFilterMenu = (event) => {
    setAnchorEl(null)
  }


  const defaultSort = {
    ascending: false,
    filter: 'all', // starred, past/upcoming/ongoing, owned
    sortBy: 'date' //starred, date, owned
  }

  const [sortMode, setSortMode] = useState(defaultSort)

  // whenever the sortMode changes, sort the projects anew
  useEffect(() => {
    setProjectsDisplayed(sortProjects(projects, user, sortMode))
  }, [, sortMode])

  useEffect(() => {
    setProjectsDisplayed(projects)
  }, [projects])

  // useEffect(() => {
  //   console.log('getting user projects in dashboard');
  //   dispatch({ type: 'GET_PROJECTS' });
  // }, [])

  // this dictates create or edit mode of the entire project creation modal
  const [createMode, setCreateMode] = useState(true)

  const filterOptions = [
    {
      type: 'all',
    },
    {
      type: 'owned',
    },
    {
      type: 'starred',
    },
    {
      type: 'ongoing',
    },
    {
      type: 'upcoming',
    },
    {
      type: 'past',
    },
  ]

  /* 
  two dimensions of sorting:

  asc/desc: date
  filter: all, starred
  */

  return (
    <Container sx={{ paddingBottom: 2 }} >
      {/* {JSON.stringify(projects)} */}
      {/* first dates: {JSON.stringify(projects.map(project=>project.first))} */}
      sort: {JSON.stringify(sortMode)}
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingY: 1 }}>
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
          <Button sx={{ textTransform: 'none', color: 'grey.700' }} endIcon={sortMode.ascending ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            onClick={() => setSortMode({ ...sortMode, ascending: !sortMode.ascending })}
          >
            {sortMode.sortBy}
          </Button>
          <Button
            sx={{ textTransform: 'none', color: 'grey.700' }}
            endIcon={<FilterListIcon />}
            onClick={openFilterMenu}
          >
            {sortMode.filter}
          </Button>
        </Box>
        {/* <IconButton
          aria-label="sort/filter projects"
          onClick={openFilterMenu}
        >
          <FilterListIcon />
        </IconButton> */}
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
      {/* Ascending <Switch /> Descending
      <Button onClick={() => setProjectsDisplayed(sortByStarred(projects))}>sort by starred</Button>
      <Button onClick={() => setProjectsDisplayed(sortByFirstAsc(projects))}>sort by date asc</Button>
      <Button onClick={() => setProjectsDisplayed(sortByFirstDesc(projects))}>sort by date desc</Button>
      <Button onClick={() => setProjectsDisplayed(projects)}>all</Button>
      <Button onClick={() => setProjectsDisplayed(projects.filter(project => project.starred))}>starred</Button>
      <Button onClick={() => setProjectsDisplayed(projects.filter(project => project.upcoming))}>upcoming</Button> */}
      <Box sx={{ ...greyBoxStyle, height: 550 }}>
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
        {/*           
          projectsDisplayed.reverse.map(project => {
            return (
              <DashboardProjectItem
                key={project.id}
                project={project}
                setCreateOpen={setCreateOpen}
                setCreateMode={setCreateMode}
              />
            )
          })
        } */}
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
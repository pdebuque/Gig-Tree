import { Paper, Box, Tabs, Tab, Typography, Grid, Item } from '@mui/material';
import ProfileProject from '../ProfileProject/ProfileProject';
import { useState } from 'react';
import TabPanel from '../../assets/TabPanel/TabPanel';
import { projects, collaborators } from '../../../temp-info';
import Collaborator from '../Collaborator/Collaborator';
import './ProfileInfo.css'
import AboutSidebar from '../AboutSidebar/AboutSidebar'

export default function ProfileInfo({ tabValue }) {


  return (
    <div className="profile-data">
      {/* <Paper
                elevation={1}
                sx={{ mt: 2 }}
            > */}
      <Grid container spacing={1} >
        <Grid item xs={5}>
          <Paper sx={{ p: 3, mt: 1 }}>
            <AboutSidebar />
          </Paper>    
        </Grid>
        <Grid item xs={7}>
          <Paper sx={{ p: 1, mt: 1 }}>
            <TabPanel value={tabValue} index={0}>
              about
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              {projects.map(project => {
                return (
                  <ProfileProject key={project.id} project={project} />
                )
              })}
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <div className="collaborators-container">
                {collaborators.map(collaborator => {
                  return (
                    <Collaborator
                      key={collaborator.id}
                      collaborator={collaborator}
                    />
                  )
                })}
              </div>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
      {/* </Paper> */}



    </div>
  )
}
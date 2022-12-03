import { Paper, Box, Tabs, Tab, Typography } from '@mui/material';
import { Grid } from '@mui/material'
import ProfileProject from '../ProfileProject/ProfileProject';
import { useState } from 'react';
import TabPanel from '../TabPanel/TabPanel';
import { projects, collaborators } from './temp-prof-info';

export default function ProfileInfo() {

    const [tabValue, setTab] = useState(0)
    const changeTab = (e, value) => {
        setTab(value);
    }

    return (
        <div className="profile-data">
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={tabValue}
                            onChange={changeTab}
                        >
                            <Tab label="all" />
                            <Tab label="projects" />
                            <Tab label="collaborators" />
                        </Tabs>

                    </Box>

                    <Paper
                        elevation={1}
                    >
                        <TabPanel value={tabValue} index={0}>
                            hello
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            {projects.map(project => {
                                return (
                                    <ProfileProject key={project.id} project={project} />
                                )
                            })}
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            {/* eventually: collaborators.map(collaborator=>return(<profilecollaborator collaborator = {collaborator}/>)) */}
                            COLLABORATORS
                        </TabPanel>
                    </Paper>
                </Grid>
            </Grid>


        </div>
    )
}
import { Paper, Box, Tabs, Tab, Typography } from '@mui/material';
import { Grid } from '@mui/material'
import ProfileProject from '../ProfileProject/ProfileProject';
import { useState } from 'react';
import TabPanel from '../TabPanel/TabPanel';

export default function ProfileInfo() {

    const [tabValue, setTab] = useState(0)
    const changeTab = (e, value) => {
        setTab(value);
    }

    return (
        <div className="profile-data">
            <Grid container spacing={2}>
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
                <Grid item xs={8}>
                    <Paper
                        elevation={1}
                    >
                        <TabPanel value = {tabValue} index = {0}>
                            ALL
                        </TabPanel>
                        <TabPanel value = {tabValue} index = {1}>
                            PROJECTS
                        </TabPanel>
                        <TabPanel value = {tabValue} index = {2}>
                            COLLABORATORS
                        </TabPanel>
                    </Paper>
                </Grid>
            </Grid>


        </div>
    )
}
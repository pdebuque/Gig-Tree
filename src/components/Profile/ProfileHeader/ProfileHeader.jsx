import { Paper } from '@mui/material'
import './ProfileHeader.css'
import {Tabs,Tab, Box} from '@mui/material'

export default function ProfileHeader({tabValue, setTab}) {
    return (
        <Paper
            elevation={1}
            className="profile-header"
            sx={{ p: 0 }}
        >
            <div className="cover-photo-container">
                <img className='cover-photo' style={{ width: '100%' }} src='./prof-images/cover-photo.jpeg' alt="cover photo" />
            </div>
            <div className="profile-header-info">
                <div className="info-container">
                    <div className="pre-pic-spacer"></div>
                    <div className="prof-pic-container">
                        <img className="prof-pic" src='./prof-images/Paolo-prof-pic.png' alt="my profile pic" /></div>
                    <div className="prof-name-subtitle">
                        <h2 className='name'>Paolo Debuque</h2>
                        <p className='subtitle'>conductor, tenor</p>
                    </div>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={tabValue}
                            onChange={(e,value)=>setTab(value)}
                        >
                            <Tab label="about" />
                            <Tab label="projects" />
                            <Tab label="collaborators" />
                        </Tabs>

                    </Box>
                </div>
            </div>
        </Paper >
    )
}
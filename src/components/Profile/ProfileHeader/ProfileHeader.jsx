import { Paper } from '@mui/material'
import './ProfileHeader.css'
import {Tabs,Tab, Box} from '@mui/material'

export default function ProfileHeader({tabValue, setTab, user}) {
    return (
        <Paper
            elevation={1}
            className="profile-header"
            sx={{ p: 0 }}
        >
            <div className="cover-photo-container">
                <img className='cover-photo' style={{ width: '100%' }} src={process.env.PUBLIC_URL + '/images/cover-photos/cover-photo.jpeg'} alt={`${user.name}'s cover photo`} />
            </div>
            <div className="profile-header-info">
                <div className="info-container">
                    <div className="pre-pic-spacer"></div>
                    <div className="prof-pic-container">
                        <img className="prof-pic" src={process.env.PUBLIC_URL + user.prof_pic} alt={`${user.name}'s profile picture`} /></div>
                    <div className="prof-name-subtitle">
                        <h2 className='name'>{user.name}</h2>
                        <p className='subtitle'>{user.instrument}</p>
                    </div>
                    <Box 
                        sx={{ borderBottom: 1, borderColor: 'divider' }}
                        className="tabs-container"
                        >
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
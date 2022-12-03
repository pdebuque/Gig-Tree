import {Paper} from '@mui/material'

export default function ProfileHeader() {
    return (
            <Paper
                elevation={1}
                className="profile-header"
                sx={{ height: 200, p: 0 }}
            >
                <div className="cover-photo-container">
                    <img className='cover-photo' style={{ width: '100%' }} src='./prof-images/cover-photo.jpeg' alt="cover photo" />
                    </div>
                <img className="prof-pic" src='./prof-images/Paolo-prof-pic.png' alt="my profile pic" />
                <div className="prof-name-subtitle">
                    <h1>Paolo Debuque</h1>
                    <p>conductor, tenor</p>
                </div>
            </Paper >
    )
}
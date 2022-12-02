/* profile displays calendar of all events and list of projects  */
import ProfileProject from '../ProfileProject/ProfileProject';
import './Profile.css';
import { Paper } from '@mui/material'


export default function Profile() {
    return (
        <div className="profile-main">
            <Paper
                elevation={3}
                className="profile-header"
            >
                <img className="prof-pic" src='./prof-images/Paolo-prof-pic.png' alt="my profile pic" />
                <h1>Paolo Debuque</h1>

            </Paper >
            <div className="profile-data">
                <Paper
                    elevation={3}
                    className="profile-projects">
                    <h2>My Projects</h2>
                    <ProfileProject />
                    <ProfileProject />
                    <ProfileProject />
                    <ProfileProject />
                </Paper>
                <Paper
                    elevation={3} className="profile-cal">
                    <h2>My Calendar</h2>
                    <img className="calendar" src="./assets/calendar.png" alt="calendar" />
                </Paper>
                {/* first column: list of projects */}


            </div>
        </div >
    )
}

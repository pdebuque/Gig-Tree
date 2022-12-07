/* 
profile page displays:
    - name
    - info
        - instrument(s)
        - ensembles performed with
        - location
    - upcoming projects
    - current projects
    - past projects

profile displays calendar of all events and list of projects 

*/


import ProfileProject from './ProfileProject/ProfileProject';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import './Profile.css';
import { Paper } from '@mui/material'
import {useState} from 'react'


export default function Profile({user}) {

    const [tabValue,setTab] = useState(0);

    return (
        <div className="profile-main">
            <ProfileHeader 
                user = {user}
                tabValue = {tabValue}
                setTab = {setTab}
            />
            <ProfileInfo 
                user = {user}
                tabValue = {tabValue}
            />
        </div >
    )
}

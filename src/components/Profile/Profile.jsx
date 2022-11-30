/* profile displays calendar of all events and list of projects  */
import ProfileProject from '../ProfileProject/ProfileProject';
import './Profile.css';


export default function Profile() {
    return(
        <main className="profile-main">
            <div className="profile-header">
                <img className="prof-pic" src='./prof-images/Paolo-prof-pic.png' alt="my profile pic" />
                <h1>Paolo Debuque</h1>
            </div>
        <section className="profile-data">
            <div className = 'temp-col'>column 1</div>
            <div className = 'temp-col'>column 2</div>
            <div>
                <h2>My Projects</h2>
                <ProfileProject />
                <ProfileProject />
                <ProfileProject />
                <ProfileProject />
            </div>
{/* first column: list of projects */}


        </section>
        </main>
    )
}

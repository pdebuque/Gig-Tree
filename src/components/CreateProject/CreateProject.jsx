/* 
create project takes inputs for project name, ensemble, dates, poster
*/

import {useState} from 'react'

export default function CreateProject() {

    const [newProject, setProject] = useState({})

    return (
        <main>
            <h1>Create new project</h1>
            <form className = "new-project-form">
                <label htmlFor="name-input">project name</label>
                <input 
                    type="text"
                    onChange={e=>setProject({...newProject,name:e.target.value})}
                    value = {newProject.name}
                    />
                <label htmlFor="name-input">ensemble</label>
                <input 
                    type="text"
                    onChange={e=>setProject({...newProject,ensemble:e.target.value})}
                    value = {newProject.ensemble}
                    />
                <label htmlFor="name-input">project name</label>
               <button type = 'submit'>submit project</button>
            </form>
        </main>
    )
}
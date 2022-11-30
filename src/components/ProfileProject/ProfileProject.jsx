/* Profile project contains info for each project. collapse component shows more info */
import {useState} from 'react'
import {Collapse, Button} from '@mui/material'

export default function ProfileProject() {
    const [collapsed, setCollapsed] = useState(true)
    return(
        <div>
            <span className="prof-proj-name">Project Name</span> with <span className = "prof-proj-ens">ensemble</span>
            <Button
            variant = 'outlined'
            color="secondary"
            onClick = {()=>setCollapsed(!collapsed)}
            >
                see more</Button>
            <Collapse
            in = {!collapsed}
            >rehearsal, rehearsal, rehearsal</Collapse>
        
        
        
        
        
        
        </div>
    )
}
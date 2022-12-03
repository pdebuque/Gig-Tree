/* Profile project contains info for each project. collapse component shows more info 

currently, project data looks like 
    {
        id: 2,
        name: 'Requiem',
        ensemble: '',
        location: 'Hamline University Methodist Church',
        owner: 'Paolo Debuque'
    }

*/

import { useState } from 'react'
import { Collapse, Button, Link } from '@mui/material'

export default function ProfileProject({project}) {
    const [collapsed, setCollapsed] = useState(true)
    return (
        <div>
            <Link
                onClick={() => alert('eventually, link to the project page')}
            >{project.name}</Link> with&nbsp; 
            <Link
                onClick={() => alert('eventually, link to ensemble page')}
            >{project.ensemble}</Link>
            <Button
                sx={{ maxWidth: 2, ml: 2 }}
                size='small'
                variant='outlined'
                color="inherit"
                onClick={() => setCollapsed(!collapsed)}
            >
                +</Button>
            <Collapse
                in={!collapsed}
            >rehearsal, rehearsal, rehearsal</Collapse>






        </div>
    )
}
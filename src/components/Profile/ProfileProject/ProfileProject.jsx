/* Profile project contains info for each project. collapse component shows more info 

currently, project data looks like 
    {
        id: 2,
        name: 'Requiem',
        ensemble: '',
        location: 'Hamline University Methodist Church',
        owner: 'Paolo Debuque',
        description: 'Concert raising money for gun violence prevention',
        repertoire: [
            {
                name: 'Requiem',
                composer: 'Gabriel Fauré'
            },
            {
                name: 'Rise Up My Love',
                composer: 'Healey Willan'
            },
        ],
        video_path: ''
    }

*/

import { useState } from 'react'
import { Collapse, Button, Link, Typography } from '@mui/material'

export default function ProfileProject({ project }) {
    const [collapsed, setCollapsed] = useState(true)
    return (
        <div>
            <Typography
                variant='body2'
            >
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
            </Typography>






        </div>
    )
}
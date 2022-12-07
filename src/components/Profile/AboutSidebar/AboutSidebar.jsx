import { me } from '../../../temp-info';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Grid } from '@mui/material'

export default function AboutSidebar() {

    const infoLayout = [
        {
            type: 'bio',
            icon: <InfoOutlinedIcon style={{ color: 'grey', fontSize: 'medium', mr: 1 }} />,
        },
        {
            type: 'location',
            icon: <LocationOnOutlinedIcon style={{ color: 'grey', fontSize: 'medium' }} />
        },
        // {
        //     type: 'jobs',
        //     icon: <WorkOutlineOutlinedIcon style={{ color: 'grey', fontSize: 'medium' }} />
        // },
        {
            type: 'available',
            icon: <CalendarMonthOutlinedIcon style={{ color: 'grey', fontSize: 'medium' }} />
        },
        // {
        //     type: 'top_collab',
        //     icon: <Groups2OutlinedIcon style={{ color: 'grey', fontSize: 'medium' }} />
        // }
    ]

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Box sx={{ fontSize: 18, color: 'grey.900', mb: 1 }}>
                        About
                    </Box>
                </Grid>
                <Grid item xs = {1}>
                    <EditOutlinedIcon style={{ color: 'grey'}}/>
                </Grid>
                {infoLayout.map(info => {
                    return (
                        <>
                            <Grid item xs={1}>
                                {info.icon}
                            </Grid>
                            <Grid item xs={11}>
                                <Box sx={{ fontSize: 14, color: 'grey.900' }}>
                                    {me[info.type]}
                                </Box>
                            </Grid>
                        </>
                    )
                })}
                {me.jobs.map(job => {
                    return (
                        <>
                            <Grid item xs={1}>
                                <WorkOutlineOutlinedIcon style={{ color: 'grey', fontSize: 'medium' }} />
                            </Grid>
                            <Grid item xs={11}>
                                <Box sx={{ fontSize: 14, color: 'grey.900' }}>
                                    {job.name} at {job.location}
                                </Box>
                            </Grid>
                        </>
                    )
                })}

            </Grid>
            {/* // <Grid container spacing={1}>
            //     <Grid item xs={1}>
            //         <InfoOutlinedIcon style={{ color: 'grey', fontSize: 'medium', mr: 1 }} /></Grid>
            //     <Grid item xs={11}>
            //         <Box sx={{ fontSize: 14, color: 'grey.900' }}>
            //             {me.bio}
            //         </Box>
            //     </Grid>
            // </Grid>
            // {me.jobs.map(job => { */}
            {/* //     return (
            //         <div>
            //             <WorkOutlineOutlinedIcon style={{ color: 'grey', fontSize: 'medium' }} /> {job.name} at {job.location}
            //         </div>
            //     )
            // })}
            // <div>
            //     <LocationOnOutlinedIcon style={{ color: 'grey', fontSize: 'medium' }} />{me.location}
            // </div>
            // <div>
            //     <CalendarMonthOutlinedIcon style={{ color: 'grey', fontSize: 'medium' }} />{me.available}
            // </div>
            // <div>
            //     <Groups2OutlinedIcon style={{ color: 'grey', fontSize: 'medium' }} />{me.top_collab.join(', ')}
            // </div> */}
        </div>
    )
}
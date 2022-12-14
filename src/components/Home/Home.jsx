import './Home.css';
import {Grid} from '@mui/material'

export default function Home() {
    return(
        <>
        <h1 className="home-title">Welcome</h1>
            <Grid container spacing = {1}>
                <Grid item xs = {5}>
                    Projects go here


                </Grid>
                <Grid item xs={7}>
                    calendar goes here
                </Grid>


            </Grid>

        </>
    )
}
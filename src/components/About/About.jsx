import { Paper, Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'


export default function About() {

    const technologies = ['html/css/js', 'react', 'Material.ui', 'node.js', 'express.js', 'PostgreSQL']

    return (
        <Paper
            sx={{ paddingY: 2, paddingX: 4, maxWidth: 1000, m: 'auto' }}
        >
            <h2>about this project</h2>
            <Grid container spacing={2}>
                <Grid item>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat maiores quas natus doloremque esse, dolorem saepe omnis repellendus odit odio sunt atque vitae totam dignissimos a blanditiis nemo est quisquam?
                    Reprehenderit adipisci optio dolorum quod iste distinctio atque, iure nostrum temporibus pariatur, esse ea soluta totam perferendis quisquam porro maiores incidunt repellendus. Optio sint eligendi modi maxime, ad debitis. Explicabo.
                    Fugiat porro temporibus deserunt iste officia ab inventore eligendi natus quo incidunt, praesentium adipisci, vero aliquid illum nisi! Nam dolorum esse numquam asperiores, sunt quo expedita natus architecto nulla unde.</Grid>
                <Grid item xs={4}>
                    <Box sx={{ ml: 2 }}>
                        <h3>technologies</h3>
                        <List>
                            {technologies.map(item => {
                                return (
                                    <ListItem key = {item} sx={{ paddingY: 0 }}>
                                        <ListItemText primary={item} />
                                    </ListItem>
                                )
                            }
                            )}
                        </List>

                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box>
                        <h3>acknowledgements</h3>
                        Many thanks to Prime for the instruction, support, and structure for learning all these skills. Special thanks (obviously) to our instructors, Liz, Dane, and Kris, as well as to the Shawl cohort.<strong> Sh'all ready for this??</strong>

                        <h3>let's connect!</h3>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}
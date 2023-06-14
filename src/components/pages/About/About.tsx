import { Paper, Box, List, ListItem, ListItemText, Typography, Grid } from '@mui/material'


export default function About() {

  const technologies = ['html/css/js', 'react', 'Material.ui', 'moment', 'react-big-calendar', 'node.js', 'express.js', 'PostgreSQL'];
  const future = ['notifications', 'messaging service', 'user profile pages', 'ensemble pages', 'resource upload (scores, images, documents, etc.)', 'email integration', 'Typescript', 'responsive design']

  return (
    <Paper
      sx={{ mt: 4, paddingY: 4, paddingX: 4, maxWidth: 600, marginX: 'auto' }}
    >
      <Typography variant='h4'>about this project</Typography>

      <Grid container spacing={2} sx={{ mt: .5 }}>
        <Grid item xs={12}>
          <Typography variant='body1'>Gig Tree was created with love to simplify the lives of freelance musicians juggling multiple projects at any one time through an unending variety of technologies (email, text, messaging apps, the list goes on and on). Hopefully this app can give these musicians an elegant one-stop shop for their scheduling and project management needs.</Typography>
          {/* </Grid><Grid item xs={2}> */}

        </Grid>
        <Grid item xs={6}>
          <Typography variant='h5' sx={{ mt: 2 }}>future developments</Typography>
          <List>
            {future.map(item => {
              return (
                <ListItem key={item} sx={{ paddingY: 0 }}>
                  <ListItemText primary={item} />
                </ListItem>
              )
            }
            )}
          </List>
        </Grid>
        <Grid item xs={6} >
          <Box sx={{ ml: 2 }}>
            <Typography variant='h5' sx={{ mt: 2 }}>technologies</Typography>
            <List>
              {technologies.map(item => {
                return (
                  <ListItem key={item} sx={{ paddingY: 0 }}>
                    <ListItemText primary={item} />
                  </ListItem>
                )
              }
              )}
            </List>

          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography variant='h5' sx={{}}>acknowledgements</Typography>
            <Typography variant='body1' sx={{ mt: 2 }}>Many thanks to Prime for the instruction, support, and structure for learning all these skills. Thanks to our instructors, Liz, Dane, Key, and Kris, as well as to the Shawl cohort. And thanks to my family and friends for their support throughout this program.</Typography>

          </Box>
        </Grid>
      </Grid>
    </Paper >
  )
}
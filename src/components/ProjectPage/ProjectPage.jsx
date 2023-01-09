import {Box, Typography, Container} from '@mui/material'
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'

export default function ProjectPage() {

  const {projectId} = useParams()
  const dispatch = useDispatch()

  // on page load, get the right project
  useEffect(()=>{
    dispatch({type: 'GET_CURRENT_PROJECT', payload: projectId})
  },[])

  const currentProject = useSelector(store=>store.currentProject)

  return(
    <Container>
      project page. {projectId}
      {JSON.stringify(currentProject)}
    </Container>
  )
}
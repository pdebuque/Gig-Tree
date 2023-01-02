import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

/* 
project saga needs to handle:
  - GET all of a user's projects
  - POST a new project (from createProject)
  - PUT edit certain project
  - DELETE selected project
*/

function* projectsSaga() {
  yield takeEvery('GET_PROJECTS', getProjects)
  yield takeEvery('ADD_PROJECT', addProject)
};

function* getProjects(action) {
  try {
    console.log('getting projects in project reducer')
    const projects = yield axios.get('/api/project')
    console.log('projects from server;', projects)
    yield put({ type: 'SET_PROJECTS', payload: projects.data })
  }
  catch (err) {
    console.log('could not get projects!', err)
  }
};

// add a new project. triggered in createReview. payload is the newProject object. 

// should talk to '/api/project'
function* addProject(action) {
  try {
    console.log('adding a project')
    yield axios.post('/api/project', action.payload)

    // at the end, empty out newProject
    yield put({ type: 'SET_NEW_PROJECT', payload: { name: '', ensemble_name: '', description: '', repertoire: [], dates: [], collaborators: [] } })
  }
  catch (err) {
    console.log('could not add project', err)
  }
}

export default projectsSaga;
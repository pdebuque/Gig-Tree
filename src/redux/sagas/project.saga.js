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
  yield takeEvery('EDIT_PROJECT', editProject)
  yield takeEvery('DELETE_PROJECT', deleteProject)
  yield takeEvery('GET_CURRENT_PROJECT', getCurrentProject)
  yield takeEvery('SET_PROJECT_STARRED', setProjectStarred)
};

function insertFirstAndLastDates(projects) {
  return projects.map(project => {
    if (!project.dates.length) return projects
      const dates = project.dates
      const datesSorted = dates.map(event => { return { ...event, date: new Date(event.date) } }).sort((a, b) => {
        if (a.date > b.date) return 1
        if (b.date > a.date) return -1
        else return 0
      })
      return { ...project, first: datesSorted[0].date, last: datesSorted[datesSorted.length - 1].date }
  })
}

function* getProjects(action) {
  try {
    // console.log('getting projects in project reducer')
    const projects = yield axios.get('/api/project')
    console.log('projects from server;', projects.data)

    const projectsWithFirstAndLast = insertFirstAndLastDates(projects.data)

    // console.log('test data type: ', typeof projects.data[0].dates[0].date)
    yield put({ type: 'SET_PROJECTS', payload: projectsWithFirstAndLast || [] })
    // set dates from the projects
    // console.log(typeof projects.data)
    yield put({ type: 'SET_USER_DATES', payload: (projects.data ? projects.data.map(project => project.dates) : []).flat() })
  }
  catch (err) {
    console.log('could not get projects!', err)
  }
};

// add a new project. triggered in createReview. payload is the newProject object. 

// should talk to '/api/project'
function* addProject(action) {
  try {
    // console.log('adding a project')
    yield axios.post('/api/project', action.payload)

    // at the end, empty out newProject and get projects again
    yield put({ type: 'SET_NEW_PROJECT', payload: { name: '', ensemble_name: '', description: '', repertoire: [], dates: [], collaborators: [] } })
    yield put({ type: 'GET_PROJECTS' })
  }
  catch (err) {
    console.log('could not add project', err)
  }
}

function* editProject(action) {
  try {
    // console.log('editing project with id', action.payload.id)
    yield axios.put(`/api/project/${action.payload.id}`, action.payload)

    // empty out newProject and get projects again
    yield put({ type: 'SET_NEW_PROJECT', payload: { name: '', ensemble_name: '', description: '', repertoire: [], dates: [], collaborators: [] } })
    yield put({ type: 'GET_PROJECTS' })
  }
  catch (err) {
    console.log('could not edit project', err)
  }
};

function* deleteProject(action) {
  try {
    console.log('deleting project with id ', action.payload);
    yield axios.delete(`/api/project/${action.payload}`);

    // get projects again

    yield put({ type: 'GET_PROJECTS' })

  }
  catch (err) {
    console.log('could not delete project', err)
  }
}

function* getCurrentProject(action) {
  try {
    console.log('getting project with id', action.payload)
    const currentProject = yield axios.get(`/api/project/${action.payload}`);
    console.log('got current project', currentProject.data)
    yield put({ type: 'SET_CURRENT_PROJECT', payload: currentProject.data })
  }
  catch (err) {
    console.log('could not get current project', err)
  }
}

function* setProjectStarred(action) {
  try {
    console.log('starring project', action.payload.id)
    yield axios.put(`/api/project/star/${action.payload.id}`, { starred: action.payload.starred });
    console.log('starred project');
    yield put({ type: 'GET_PROJECTS' })


  }
  catch (err) {
    console.log('coudl not set starred', err)
  }
}

export default projectsSaga;
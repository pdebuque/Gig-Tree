import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';

function* projectsSaga() {
  yield takeEvery('GET_PROJECTS', getProjects)
};

function* getProjects(action) {
  try{
    console.log('getting projects in project reducer')
    const projects = yield axios.get('/api/project')
    console.log('projects from server;', projects)
    yield put({type: 'SET_PROJECTS', payload: projects.data})
  }
  catch(err) {
    console.log('could not get projects!', err)
  }
};


export default projectsSaga;
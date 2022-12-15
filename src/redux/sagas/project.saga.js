import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';

function* projectsSaga() {
  yield takeEvery('GET_PROJECTS', getProjects)
};

function* getProjects(action) {
  try{
    const projects = yield axios.get('/api/projects')
    put({type: 'SET_PROJECTS', payload: projects.data})
  }
  catch(err) {
    console.log('could not get projects!', err)
  }
};


export default projectsSaga;
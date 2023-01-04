import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';

function* allUsersSaga() {
  yield takeEvery('FETCH_ALL_USERS', fetchAllUsers)
}

function* fetchAllUsers(action) {
  try{
    console.log('fetching all users')
    const allUsers = yield axios.get('/api/allUsers')
    yield put({type: 'SET_ALL_USERS', payload: allUsers.data})
  }
  catch(err) {
    console.log('could not fetch users', err)
  }
}

export default allUsersSaga
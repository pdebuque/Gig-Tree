import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';

/* events saga needs to handle:
  - GET all of a user's events
  - POST new event
  - PUT edited event details
  - DELETE selected event

*/

function* dateSaga() {
  yield takeEvery('GET_USER_DATES', getUserDates);
  yield takeEvery('ADD_EVENT', addEvent);
  yield takeEvery('EDIT_EVENT', editEvent);
  yield takeEvery('DELETE_EVENT', deleteEvent)
};

function* getUserDates(action) {
  try{
    console.log('getting dates in date saga')
    const userDates = yield axios.get('/api/date')
    console.log(userDates.data)
    yield put({type: 'SET_USER_DATES', payload: userDates.data})
  }
  catch(err) {
    console.log('could not get projects!', err)
  }
};

function* addEvent(action) {
  try{
    console.log('adding event')
  }
  catch(err) {
    console.log('could not add event', err)
  }
}

function* editEvent(action) {
  try{
    console.log('editing event')
  }
  catch(err) {
    console.log('could not edit event', err)
  }
}

function* deleteEvent(action) {
  try{
    console.log('deleting event')
  }
  catch(err) {
    console.log('could not delete event', err)
  }
}


export default dateSaga;
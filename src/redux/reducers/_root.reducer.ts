import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';

//todo: import all other reducers here
import project from './project.reducer';
import newProject from './newProject.reducer'
import allUsers from './allUsers.reducer'
import dates from './date.reducer'
import currentProject from './currentProject.reducer'
import nextDate from './nextDate.reducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  project,
  newProject,
  allUsers,
  dates,
  currentProject,
  nextDate
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

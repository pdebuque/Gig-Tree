const projectsReducer = (state=[], action) =>{
  switch(action.type) {
    case 'SET_PROJECTS':
      console.log('setting projects', action.payload)
      return action.payload;

    default:
      return state;
  }
}

export default projectsReducer
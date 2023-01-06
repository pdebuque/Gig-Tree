const newProjectReducer = (state = { name: '', ensemble_name: '', description: '',repertoire: [], dates: [], collaborators: [] }, action) => {
  switch (action.type) {
    case 'SET_NEW_PROJECT':
      return action.payload
    case 'SET_GENERAL':
      return {...state, name: action.payload.name, ensemble_name: action.payload.ensemble_name, description: action.payload.description, repertoire: action.payload.repertoire};
    case 'SET_SCHEDULE':
      console.log('setting dates in new project reducer')
      return {...state, dates: action.payload};
    case 'SET_COLLABORATORS':
      return {...state, collaborators: action.payload};
    default:
      return state;
  }
}

export default newProjectReducer
const newProjectReducer = (state = { name: '', ensemble_name: '', backgroundColor: '#7e1f89', color: '#ffffff', description: '',repertoire: [], dates: [], collaborators: [] }, action) => {
  switch (action.type) {
    case 'SET_NEW_PROJECT':
      return action.payload
    case 'SET_GENERAL':
      return {...state, name: action.payload.name, ensemble_name: action.payload.ensemble_name, description: action.payload.description, repertoire: action.payload.repertoire, color: action.payload.color, backgroundColor: action.payload.backgroundColor};
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
const currentProjectReducer = (state = {dates: [], collaborators: [], repertoire: []}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PROJECT':
      return action.payload;
    default:
      return state;
  }
};

export default currentProjectReducer;

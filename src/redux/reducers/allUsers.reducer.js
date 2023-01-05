const allUsersReducer = (state=[{user1: 'user1'}, ], action) => {
  switch(action.type) {
    // dispatch will come from allUsers saga
    case 'SET_ALL_USERS':
      console.log('setting all users', action.payload)
      return action.payload;
    default:
      return state
  }
}

export default allUsersReducer
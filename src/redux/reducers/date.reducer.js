// import events from '../../events'

const dateReducer = (state=[],action) => {
  if (action.type==='SET_USER_DATES') return action.payload
  return state
}

export default dateReducer
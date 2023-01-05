import events from '../../events'

const dateReducer = (state=events,action) => {
  if (action.type==='SET_USER_DATES') return action.payload
  return state
}

export default dateReducer
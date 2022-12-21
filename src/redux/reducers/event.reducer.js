import events from '../../events'

const eventsReducer = (state=events,action) => {
  if (action.type==='SET_EVENTS') return action.payload
  return state
}

export default eventsReducer
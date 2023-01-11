const defaultDate = {
  name: '',
  location: '',
  date: '1/8/2023, 4:15:00 PM',
  start: '1/8/2023, 4:15:00 PM',
  end: '1/8/2023, 4:15:00 PM',
  project_id: 1,
  type: '',
  notes: '',
  project_name: '',
  ensemble_name: '',
  backgroundColor: '#fff',
  color: '#fff'
}

const nextDateReducer = (state = { defaultDate }, action) => {
  if (action.type === 'SET_NEXT_DATE') return action.payload
  return state
}

export default nextDateReducer
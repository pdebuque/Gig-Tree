const now = new Date()

export default [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2022, 12, 0),
    end: new Date(2022, 12, 1),
    hex: '#fb8500',
    text: '#fffff'
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2022, 12, 7),
    end: new Date(2022, 12, 10),
    hex: '#fb8500',
    text: '#fffff'
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2022, 12, 13, 0, 0, 0),
    end: new Date(2022, 12, 20, 0, 0, 0),
    hex: '#023047',
    text: '#fffff'
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2022, 12, 6, 0, 0, 0),
    end: new Date(2022, 12, 13, 0, 0, 0),
    hex: '#fb8500',
    text: '#fffff'
  },

  
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
    hex: '#023047',
    text: '#fffff'
  },
  
]
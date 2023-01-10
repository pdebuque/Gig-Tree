/* projects array looks like: 

[
  {
    id: 43, 
    name: 'color darkness experiment', 
    ensemble_name: 'some ensemble', 
    owner_id: 5, 
    starred: false,
    description: '',
    color: '',
    backgroundColor: '',
    collaborators: [{},{},],
    dates: [{},{},],
    repertoire: [{},{},],
  }
  ...
]

*/

export function sortByStarred(projectsArr) {
  return projectsArr.sort((a, b) => {
    if (a.starred && !b.starred) return 1
    if (!a.starred && b.starred) return -1
    return 0
  })
}

export function sortByFirstAsc(projectsArr) {
  return projectsArr.sort((a, b) => {
    if (a.first > b.first) return 1
    if (b.first > a.first) return -1
    return 0
  })
}
export function sortByFirstDesc(projectsArr) {
  return projectsArr.sort((a, b) => {
    if (a.first > b.first) return -1
    if (b.first > a.first) return 1
    return 0
  })
}

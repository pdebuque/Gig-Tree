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

export default function sortByStarred (projectsArr) {
  return projectsArr.sort((a,b)=>{
    if (a.starred && !b.starred) return 1
    if (!a.starred && b.starred) return -1
    return 0
  })
}
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

export default function filterAndSortProjects(projects, user, sortCriteria) {
  // two leves of the sort: first the filter, then the sort by
  const sorted = sortProjects(projects, user, sortCriteria)
  const filtered = filterProjects(sorted,user,sortCriteria)

  if (sortCriteria.ascending) filtered.reverse()

  return filtered
}

function filterProjects(projects, user, sortCriteria) {

  switch (sortCriteria.filter) {
    case 'starred':
      return projects.filter(project => project.starred);
      break;
    case 'owned':
      return projects.filter(project => project.owner_id === user.id);
      break;
    case 'ongoing':
      return projects.filter(project => project.ongoing);
      break;
    case 'upcoming':
      return projects.filter(project => project.upcoming);
      break;
    case 'past':
      return projects.filter(project => project.past)
      break;
    case 'all':
      return projects
  }
}

function sortProjects(projects,user,sortCriteria) {

  // default is ascending
  switch(sortCriteria.sortBy) {
    case 'date':
      return projects.sort(sortByFirstDesc);
      break;
  }
}


export function sortByStarred(projectsArr) {
  return projectsArr.sort((a, b) => {
    if (!a.starred) return 1
    if (a.starred && !b.starred) return 1
    if (!a.starred && b.starred) return -1
    return 0
  })
}

// function sortByFirstAsc(a,b) {
//     if (a.first > b.first) return 1
//     if (b.first > a.first) return -1
//     return 0
//   }

export function sortByFirstDesc(a,b) {
    if (a.first > b.first) return -1
    if (b.first > a.first) return 1
    return 0
}


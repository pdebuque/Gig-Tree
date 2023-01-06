/* 
module to convert dates back and forth from Date() objects.

projects will be submitted as [{...project, dates: [{...date, start, end}]},...]

to save in database, these must be converted .toLocaleString()

when getting from projects table, dates must be converted back
*/

// user is only preparing a single project at a time. input is a single project
exports.prepareDatesForDB = (project) => {
  project.dates.map(date => date.toLocaleString())
  return project
}

// function at the end of project fetching. will be used on array of projects sent down from db

// take date of format '2023-01-16T15:14:25.000Z' => Date(2023, 1, 16, 15, 14)

exports.parseDatesFromDB = (projectsArr) => {

  // for each project, convert each date in the dates array.
  for (let project of projectsArr) {
    project.dates.map(date => {
      date.date = new Date(date.date);
      date.start = new Date(date.start);
      date.end = new Date(date.end)
    })
  }
  return projectsArr
}
export const getDate = (dateString) => {
  return dateString.split(' ')[0].replace(',', '')
}

export const getTime = (dateString) => {
  const splitArr = dateString.split(' ')
  return splitArr[1].split(':').splice(0, 2).join(':') + ' ' + splitArr[2]
}
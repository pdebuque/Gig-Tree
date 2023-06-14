import {DateTime} from 'luxon'


export const getDate = (dateString:string) => {
  return dateString.split(' ')[0].replace(',', '')
}

export const getTime = (dateString:string) => {
  console.log('dateString', dateString)
  const splitArr = dateString.split(' ')
  return splitArr[1].split(':').splice(0, 2).join(':') + ' ' + splitArr[2]
}
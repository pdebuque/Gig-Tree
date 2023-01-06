export function convertTime(date, time) {
  const dateValues = [date.getFullYear(), date.getMonth(), date.getDate()]
  const timeValues = [time.getHours(), time.getMinutes(), time.getSeconds()]
  return new Date(dateValues[0], dateValues[1], dateValues[2], timeValues[0], timeValues[1], timeValues[2])
}

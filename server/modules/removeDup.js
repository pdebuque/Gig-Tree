// given an array, take out all duplicate elements based on id.




const removeDupById = (arr) => {
  if (!arr.length) return []

  const output=[];
  const outputIds=[];

  for (let el of arr) {
    if (el && !(outputIds.includes(el.id))) {
      output.push(el)
      outputIds.push(el.id)
  }}
  return output
}

module.exports = removeDupById
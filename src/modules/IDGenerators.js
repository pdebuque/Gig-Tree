export function* idGen() {
  let i = 1
  while (i>0) {
    yield i
    i++
  }
}

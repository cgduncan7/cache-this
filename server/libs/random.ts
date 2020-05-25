export function generateRandomValues (numValues: number, startValue = 1, endValue = 99): number[] {
  if ((endValue - startValue) + 1 < numValues) {
    throw new Error('Not enough values to choose from')
  }
  
  const possibilities = []
  for (let i = startValue; i <= endValue; i += 1) {
    possibilities.push(i)
  }

  const v = []
  for (let i = 0; i < numValues; i += 1) {
    // choose random index
    const index = Math.floor(Math.random() * possibilities.length)
    const toAdd = possibilities.splice(index)[0]
    v.push(toAdd)
  }
  return v
}
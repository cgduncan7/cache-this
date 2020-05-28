/**
 * Creates a number[] of length numValues in [1,99] domain
 * @param numValues number of values to create
 * @param startValue starting value [inclusive]
 * @param endValue ending value [inclusive]
 */
export function generateRandomValues (numValues: number, startValue = 1, endValue = 99): number[] {
  if ((endValue - startValue) + 2 < numValues) {
    throw new Error('Not enough values to choose from')
  }

  const set = new Set<number>()
  while (set.size < numValues) {
    // choose random index
    const r = Math.random()
    const scaledR = r * (endValue - startValue + 1) + startValue
    const flooredR = Math.floor(scaledR)
    set.add(flooredR)
  }

  const toReturn: number[] = Array.from(set)
  return toReturn
}
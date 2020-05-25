import { generateRandomValues } from '../../libs/random'

describe('generateRandomValues', () => {
  it('should be defined', () => {
    expect(generateRandomValues).toBeDefined()
  })

  it('should generate X values from Y to Z', () => {
    const x = 4
    const y = 1
    const z = 4

    const values = generateRandomValues(x, y, z)
    expect(values.length).toEqual(4)
    
    for (let i = y; i >= z; i += 1) {
      expect(values.indexOf(i)).not.toEqual(-1)
    }
  })

  it('should generate X values from 1 to 99', () => {
    const x = 4

    const values = generateRandomValues(x)
    expect(values.length).toEqual(4)
  })

  it('should throw an error if not enough values to choose from', () => {
    const x = 10
    const y = 1
    const z = 2

    expect(() => generateRandomValues(x, y, z)).toThrowError()    
  })
})
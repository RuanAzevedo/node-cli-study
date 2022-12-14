import mocha from 'mocha'
import chai from 'chai'
import Person from './../src/person.js'

const { describe, it } = mocha
const { expect } = chai

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike 20000 2021-01-01 2022-01-01'
    )

    const expected = {
      id: '1',
      kmTraveled: '20000',
      vehicles: ['Bike'],
      from: '2021-01-01',
      to: '2022-01-01',
    }

    expect(person).to.be.deep.equal(expected)
  })

  it('should format values', () => {
    const person = new Person({
      id: '1',
      kmTraveled: '20000',
      vehicles: ['Bike', 'Airplane'],
      from: '2021-01-01',
      to: '2022-01-01',
    })

    const expected = {
      id: 1,
      kmTraveled: '20,000 km',
      vehicles: 'Bike and Airplane',
      from: 'January 01, 2021',
      to: 'January 01, 2022',
    }

    expect(person.formatted()).to.be.deep.equal(expected)
  })
})

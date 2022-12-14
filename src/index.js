import DraftLog from 'draftlog'
import chanlk from 'chalk'
import chalktable from 'chalk-table'
import readLine from 'readline'

import database from './../database.json'
import Person from './person.js'

DraftLog(console).addLineListener(process.stdin)

const options = {
  leftPad: 2,
  columns: [
    { field: 'id', name: chanlk.cyan('ID') },
    { field: 'vehicles', name: chanlk.magenta('Vehicles') },
    { field: 'kmTraveled', name: chanlk.cyan('KmTraveled') },
    { field: 'from', name: chanlk.cyan('From') },
    { field: 'to', name: chanlk.cyan('To') },
  ],
}

const table = chalktable(
  options,
  database.map((item) => new Person(item).formatted())
)
const print = console.draft(table)

const terminal = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
})

terminal.question('What is your name? ', (name) => {
  console.log(`Hi ${name}!`)
  terminal.close()
})

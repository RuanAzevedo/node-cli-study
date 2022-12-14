import DraftLog from 'draftlog'
import chanlk from 'chalk'
import chalktable from 'chalk-table'

import readLine from 'readline'
import Person from './person.js'

export default class TerminalController {
  constructor() {
    this.print = {}
    this.data = {}
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin)
    this.terminal = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    this.initializeTable(database, language)
  }

  initializeTable(database, language) {
    const data = database.map((item) => new Person(item).formatted(language))
    const table = chalktable(this.getTableOptions(), data)

    this.print = console.draft(table)
    this.data = data
  }

  question(msg = '') {
    return new Promise((resolve) => this.terminal.question(msg, resolve))
  }

  closeTerminal() {
    this.terminal.close()
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: 'id', name: chanlk.cyan('ID') },
        { field: 'vehicles', name: chanlk.magenta('Vehicles') },
        { field: 'kmTraveled', name: chanlk.cyan('KmTraveled') },
        { field: 'from', name: chanlk.cyan('From') },
        { field: 'to', name: chanlk.cyan('To') },
      ],
    }
  }
}

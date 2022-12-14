import TerminalController from './terminalController.js'
import { save } from './repository.js'

import database from './../database.json'
import Person from './person.js'

const DEFAULT_LANG = 'pt-BR'
const STOP_TERM = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
  try {
    const answer = await terminalController.question('What is your command? ')

    if (answer === STOP_TERM) {
      terminalController.closeTerminal()
    }

    const person = Person.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted(DEFAULT_LANG))

    await save(person)

    return mainLoop()
  } catch (error) {
    console.log('Error: ', error)

    return mainLoop()
  }
}

await mainLoop()

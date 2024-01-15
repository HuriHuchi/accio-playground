import { spawn } from 'child_process'
import { getProjectPath, isDirExist, openVsCode } from '../lib/utils.js'
import chalk from 'chalk'
import { log } from 'console'

const KEY = 'react'

async function reactHandler() {
  const projectPath = getProjectPath(KEY)

  if (isDirExist(projectPath)) {
    openVsCode(projectPath)
    return
  }

  const app = spawn('npx', ['create-react-app', projectPath])
  app.stdout.on('data', (data) => {
    console.log(data.toString())
  })

  app.on('close', (code) => {
    if (code === 0) {
      log(chalk.green('React project created successfully'))
      openVsCode(projectPath)
    } else {
      log('🟥 Error')
    }
  })
}

export default reactHandler

import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(fullscreen = true): void {
  const isDev = process.env.NODE_ENV === 'development'

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    title: 'Pipe Screen Saver (Windows 95)',
    frame: false,
    titleBarStyle: 'hidden',
    resizable: false,
    fullscreen: fullscreen,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()

    if (isDev) {
      // mainWindow.webContents.openDevTools()
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  const closeOnInput = () => {
    if (!isDev) {
      mainWindow.close()
    }
  }

  if (fullscreen) {
    mainWindow.on('blur', closeOnInput)
    mainWindow.webContents.on('before-input-event', closeOnInput)

    // ipcMain.on('close-window', closeOnInput)
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  const args = process.argv

  if (args.includes('/s')) {
    createWindow(true)
  } else if (args.includes('/c')) {
    createWindow()
  } else {
    createWindow()
  }

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

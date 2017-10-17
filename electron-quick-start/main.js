const electron = require('electron')
const log4js = require('log4js')
const log4js_config = require('./log4js.json')
const tracer = require('tracer')
const fs = require('fs')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
// ipcMain
const ipcMain = electron.ipcMain

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

let logDirExt = fsExistsSync('./log');
if(!logDirExt){
    fs.mkdirSync('./log');
}

log4js.configure(log4js_config);
var logger = log4js.getLogger('logInfo');
//let logger = tracer.dailyfile({root:'./log', maxLogFiles: 2, allLogsFileName: 'tracer'})

/**
 * 判断文件夹是否存在
 */
function fsExistsSync(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, frame: false}) //frame 是否有边框

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    logger.info('程序已关闭');
    mainWindow = null
  })

  mainWindow.webContents.on('did-finish-load', () => {
    logger.error('程序已启动');
    mainWindow.webContents.send('main-process-messages', 'webContent event "did-finish-load" called');
      for(var i=1; i<1000; i++){
          logger.info('消息 "did-finish-load" 已发送');
      }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//async message
ipcMain.on('asynchronous-message', (event, arg) => {
    logger.info('发送异步消息：ok');
    event.sender.send('asynchronous-reply', 'ok');
})

//sync message
ipcMain.on('synchronous-message', (event, arg) => {
    event.returnValue = 'ok';
})
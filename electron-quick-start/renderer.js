// This file is required by the index.html file and will
// be executed in the renderer process for that window.
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

//main to render
ipcRenderer.on('main-process-messages', (event, message) => {
    console.log('message from Main Process:', message);
});

//async message
ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log('asynchronous-reply: %O %O', event, arg);
});

ipcRenderer.send('asynchronous-message', 'hello');

//sync message
console.log('synchronous-message: ', ipcRenderer.sendSync('synchronous-message', 'hello'));
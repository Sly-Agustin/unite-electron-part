// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('envVars', {
  host: 'http://localhost:3000'
})

contextBridge.exposeInMainWorld('events', {
  ping: (args) => ipcRenderer.invoke('ping', { str: args }),
})

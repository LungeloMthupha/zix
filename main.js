const { app, BrowserWindow,globalShortcut,Tray, Menu } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        frame: false,
        titleBarStyle: 'hidden',
        center: true,
        icon:"./ico/Zix.ico"
    })
    win.maximize();
    win.loadFile('index.html')
}


  
// app.whenReady().then(() => {
//     createWindow()
// })
  
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


app.on('will-quit', () => {
    // Unregister a shortcut.
    globalShortcut.unregister('Escape')
  
    // Unregister all shortcuts.
    globalShortcut.unregisterAll()
  })


app.whenReady().then(() => {
    createWindow()
  const tray = new Tray('./ico/Zix.ico');
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Break', type: 'radio' },
  ]);

  tray.setToolTip('Zix');
  tray.setContextMenu(contextMenu)
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    
    // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('Escape', () => {
      console.log('Escape');
      app.quit();
  })

  if (!ret) {
    console.log('registration failed')
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('Escape'))
})
  
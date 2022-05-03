const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

// Helper Functions/Variables
const trashBinPath = require('./helpers/trash-bin-path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createTray = () => {
  const tray = new Tray(path.join(__dirname, 'assets', 'icon_tray.png'));
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Run', click: () => console.log('clicked run')},
    {label: 'Quit', click: () => console.log('clicked quit')}
  ]);
  tray.setContextMenu(contextMenu);


};

app.on('ready', createTray);
const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createTray = () => {
  const tray = new Tray(path.join(__dirname, 'assets', 'icon_tray.png'));
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type:'radio'},
    {label: 'Item1', type:'radio', checked: true}
  ]);
  tray.setContextMenu(contextMenu);
};

app.on('ready', createTray);
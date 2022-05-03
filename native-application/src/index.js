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

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
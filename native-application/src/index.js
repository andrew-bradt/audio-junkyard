const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

// Helper Functions/Variables
const trashBinPath = require('./helpers/trash-bin-path');
const audioRegexp = /\*.aif/i;

const {watchForNewFileOfType, abortWatchDir} = require('./helpers/watch-dir-for-changes');
// const watchAudioInTrashBin = watchForNewFileOfType(trashBinPath, audioRegexp);
const watchAudioInTrashBin = watchForNewFileOfType('/Users/andrewbradt/Desktop/test', audioRegexp);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createTray = () => {
  const tray = new Tray(path.join(__dirname, 'assets', 'icon_tray.png'));
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Run', click: watchAudioInTrashBin},
    {label: 'Quit', click: abortWatchDir}
  ]);
  tray.setContextMenu(contextMenu);
};

app.on('ready', createTray);
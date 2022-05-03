const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

// Helper Functions/Variables

const trashBinPath = require('./helpers/trash-bin-path');
const audioRegexp = /\*.aif/i;
const watchTrashBinForChanges = require('./helpers/watch-dir-for-changes')(trashBinPath, audioRegexp);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createContext = (label, onClick) => Menu.buildFromTemplate([{label, click: onClick}]);

const createOffContext = (tray) => {
  const currentContext = createContext('off', () => {
    console.log('off');
    tray.setContextMenu(createOnContext(tray));
  });
  return currentContext;
};

const createOnContext = (tray) => {
  const currentContext = createContext('on', () => {
    console.log('on');
    tray.setContextMenu(createOffContext(tray));
  });
  return currentContext;
};

const createTray = () => {
  const tray = new Tray(path.join(__dirname, 'assets', 'icon_tray.png'));
  const defaultContext = createOffContext(tray);
  tray.setContextMenu(defaultContext);
};

app.on('ready', createTray);
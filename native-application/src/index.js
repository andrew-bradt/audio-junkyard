const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

// Helper Functions/Variables

const trashBinPath = require('./helpers/trash-bin-path');
const tempDirToWatch = '/Users/andrewbradt/Desktop/test';
const isAudio = require('./helpers/is-audio');
const watchTrashBinForChanges = require('./helpers/watch-dir-for-changes')({
  path: tempDirToWatch,
  filter: isAudio,
  callback: (name) => console.log(name)
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createContext = (label, onClick) => Menu.buildFromTemplate([{label, click: onClick}]);

const createOffContext = (tray, abort) => {
  const currentContext = createContext('off', () => {
    console.log('off');
    abort();
    tray.setContextMenu(createOnContext(tray));
  });
  return currentContext;
};

const createOnContext = (tray) => {
  const {beginWatch, abortWatch} = watchTrashBinForChanges();
  const currentContext = createContext('on', () => {
    console.log('on');
    beginWatch();
    tray.setContextMenu(createOffContext(tray, abortWatch));
  });
  return currentContext;
};

const createTray = () => {
  const tray = new Tray(path.join(__dirname, 'assets', 'icon_tray.png'));
  const defaultContext = createOnContext(tray);
  tray.setContextMenu(defaultContext);
};

app.on('ready', createTray);
const {platform, homedir} = require('os');
const path = require('path');

const userPlatform = platform();

module.exports = (() => {
  if (userPlatform === 'darwin' || userPlatform === 'linux') {
    return path.join(homedir(), '.Trash');
  } else if (userPlatform === 'win32') {
    return 'tbd';
  }
})();
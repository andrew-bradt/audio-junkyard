const {watch} = require('fs/promises');
const ac = new AbortController();
const {signal} = ac;
const abortWatchDir = () => ac.abort();

const watchForNewFileOfType = (path, regexp) => async() => {
  const watcher = watch(path, {signal, recursive: true});

  for await (const event of watcher) {
    console.log(event);
  }
};

module.exports = {watchForNewFileOfType, abortWatchDir};
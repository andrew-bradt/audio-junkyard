const {watch} = require('fs/promises');

module.exports = (path, regexp) => () => {
  const ac = new AbortController();
  const {signal} = ac;

  const abortWatch = () => ac.abort();
  
  const beginWatch = async() => {
    const watcher = watch(path, {signal, recursive: true});

    for await (const event of watcher) {
      console.log(event);
    }
  };
  
  return {beginWatch, abortWatch};
};
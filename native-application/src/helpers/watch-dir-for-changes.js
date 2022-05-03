const {watch} = require('fs/promises');

module.exports = (path, regexp) => () => {
  const ac = new AbortController();
  const {signal} = ac;

  const abortWatch = () => ac.abort();

  const beginWatch = async() => {
    try {
      const watcher = watch(path, {signal, recursive: true});

      for await (const event of watcher) {
        console.log(event);
      }
      
    } catch (err) {
      if (err.name === 'AbortError')
        return;
      throw err;
    }
  };

  return {beginWatch, abortWatch};
};
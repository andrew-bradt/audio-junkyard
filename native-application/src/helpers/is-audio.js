const regexp = /^.*\.(aif|aiff|wav|wave|mp3)$/i;

// TODO: if test returns true, verify if audio file by viewing meta data
const isAudio = (filename) => regexp.test(filename);

module.exports = isAudio;
const stripValue = require('../utils/stripValue');

module.exports = (results) => {
  const { TrackEvent, ServerName } = results;

  return {
    name: stripValue(ServerName),
    location: stripValue(TrackEvent),
  }
}
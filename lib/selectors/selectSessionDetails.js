const stripValue = require('../utils/stripValue');

const determineType = (results) => {
  if (results.Race) {
    return 'Race';
  } else if (results.Practice1) {
    return 'Practice';
  } else {
    return 'Qualifying';
  }
}

module.exports = (results) => {
  const { TrackEvent, ServerName } = results;
  const sessionType = determineType(results);

  return {
    name: stripValue(ServerName),
    location: stripValue(TrackEvent),
    sessionType
  }
}
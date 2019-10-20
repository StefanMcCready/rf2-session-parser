const stripValue = require('../utils/stripValue');

module.exports = (results, session) => {
  const { RaceLaps, TrackEvent, ServerName, RaceTime } = results;
  
  return {
    name: stripValue(ServerName),
    location: stripValue(TrackEvent),
    session,
  }
}

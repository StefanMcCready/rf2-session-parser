const stripValue = require('../utils/stripValue');
const formatTime = require('../utils/formatTime');

module.exports = (driver) => {
  const { Name, TeamName, Position, BestLapTime } = driver;

  return {
    position:  stripValue(Position),
    name: stripValue(Name),
    team: stripValue(TeamName),
    fastestLap: BestLapTime ? formatTime(stripValue(BestLapTime)) : 'No Time Set',
  }
}
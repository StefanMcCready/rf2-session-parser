const stripValue = require('../utils/stripValue');
const formatTime = require('../utils/formatTime');

module.exports = (driver) => {
  const { Name, TeamName, Laps, FinishTime, Pitstops, GridPos, ClassPosition, CarType } = driver;

  return {
    position:  stripValue(ClassPosition),
    name: stripValue(Name),
    team: stripValue(TeamName),
    car: stripValue(CarType),
    raceTime: FinishTime ? formatTime(stripValue(FinishTime)) : 'DNF',
    lapsCompleted:  stripValue(Laps),
  }
}
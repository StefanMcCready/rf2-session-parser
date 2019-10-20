const stripValue = require('../utils/stripValue');
const gapToFirst = require('../utils/gapToFirst');
const formatTime = require('../utils/formatTime');

module.exports = (driver, leaderFinishTime, raceLaps, session) => {
  const { Name, TeamName, Laps, FinishTime, Pitstops, GridPos, ClassPosition, CarType } = driver;

  return {
    position:  stripValue(ClassPosition),
    name: stripValue(Name),
    team: stripValue(TeamName),
    car: stripValue(CarType),
    raceTime: FinishTime ? formatTime(stripValue(FinishTime)) : 'DNF',
    lapsCompleted:  stripValue(Laps),
    gapToFirst: stripValue(ClassPosition) !== '1' ? (FinishTime ? gapToFirst(stripValue(FinishTime), stripValue(leaderFinishTime), stripValue(Laps), raceLaps, session) : 'DNF') : null,
    pitstops: stripValue(Pitstops)
  } 
}
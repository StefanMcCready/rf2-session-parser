const stripValue = require('../utils/stripValue');
const gapToFirst = require('../utils/gapToFirst');
const formatTime = require('../utils/formatTime');

module.exports = (driver, leaderFinishTime, raceLaps, session, options) => {
  const { Name, TeamName, Laps, FinishTime, Pitstops, GridPos, ClassPosition, CarType } = driver;

  const pointsAwarded = options.pointsAwarded && options.pointsAwarded[stripValue(ClassPosition)] || 0;

  const mappedData = {
    position:  stripValue(ClassPosition),
    name: stripValue(Name),
    team: stripValue(TeamName),
    car: stripValue(CarType),
    raceTime: FinishTime ? formatTime(stripValue(FinishTime)) : 'DNF',
    gapToFirst: stripValue(ClassPosition) !== '1' ? (FinishTime ? gapToFirst(stripValue(FinishTime), stripValue(leaderFinishTime), stripValue(Laps), raceLaps, session) : 'DNF') : null,
    lapsCompleted:  stripValue(Laps),
    pointsAwarded: pointsAwarded,
    pitstops: stripValue(Pitstops),
    positionsMoved: stripValue(GridPos) - stripValue(ClassPosition),
  }

  if (!options.pointsAwarded) {
    delete mappedData.pointsAwarded
  }

  return mappedData;
}

const stripValue = require('../utils/stripValue');
const stripAndParse = require('../utils/stripAndParse');
const formatTime = require('../utils/formatTime');

const raceTime = (finishStatus, finishTime) => {
  let status;

  if (stripValue(finishStatus) === 'DNF') {
    status = 'DNF';
  } else {
    status = formatTime(stripValue(finishTime), true);
  }

  return status;
}

const fastestLap = (fastestTime) => {
  let time;

  if (fastestTime) {
    time = formatTime(stripValue(fastestTime));
  } else {
    time = 'No time set';
  }

  return time;
}

module.exports = (driver, options, session) => {
  const {
    Name,
    TeamName,
    GridPos,
    Position,
    BestLapTime,
    FinishStatus,
    FinishTime,
  } = driver;

  const {
    pointsAwarded
  } = options;

  const position = stripAndParse(Position);
  const fastestTime = fastestLap(BestLapTime);

  if (session === 'race') {
    const points = pointsAwarded.standardAllocation[position];
    const finishTime = raceTime(FinishStatus, FinishTime);
    const positionsMoved = stripValue(GridPos) - stripValue(Position);
  }

  const coreData = {
    name: stripValue(Name),
    team: stripValue(TeamName),
    fastestTime,
  }

  if (session === 'race') {
    return {
      ...coreData,
      gridPosition: stripAndParse(GridPos),
      position,
      points,
      finishTime,
      positionsMoved
    }
  } else {
    return {
      ...coreData
    }
  }
}

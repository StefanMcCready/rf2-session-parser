const stripValue = require('../utils/stripValue');
const stripAndParse = require('../utils/stripAndParse');
const formatTime = require('../utils/formatTime');
const gapToFirst = require('../utils/gapToFirst');

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

module.exports = (driver, options = {}, session, sessionDetails) => {
  const {
    Name,
    TeamName,
    GridPos,
    Position,
    BestLapTime,
    FinishStatus,
    FinishTime,
    Laps
  } = driver;

  const { pointsAwarded } = options;
  const { leader, laps } = sessionDetails;
  const deduceGapToLeader = () => {
    if (position !== 1) {
      return gapToFirst({ BestLapTime, FinishTime, Laps }, leader, laps, session);
    }
  }

  const position = stripAndParse(Position);
  const fastestTime = fastestLap(BestLapTime);
  const gapToLeader = deduceGapToLeader();

  const coreData = {
    position,
    name: stripValue(Name),
    team: stripValue(TeamName),
    fastestTime,
    gapToLeader,
  }

  if (session === 'race') {
    const points = () => {
      if (pointsAwarded) {
        return pointsAwarded.standardAllocation[position];
      }
    }
      
    const finishTime = raceTime(FinishStatus, FinishTime);
    const positionsMoved = stripValue(GridPos) - stripValue(Position);

    return {
      ...coreData,
      gridPosition: stripAndParse(GridPos),
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

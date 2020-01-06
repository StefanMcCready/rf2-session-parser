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

module.exports = (driver, options, session, sessionDetails) => {
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
  const { leader, laps: sessionLaps } = sessionDetails;

  const position = stripAndParse(Position);
  const fastestTime = fastestLap(BestLapTime);
  const coreData = {
    position,
    name: stripValue(Name),
    team: stripValue(TeamName),
    fastestTime,
    gapToLeader: position !== 1 ? (FinishTime ? gapToFirst(stripValue(FinishTime), stripValue(leader.FinishTime), stripValue(Laps), stripValue(sessionDetails.laps), session) : 'DNF') : null
  }

  if (session === 'race') {
    const points = pointsAwarded.standardAllocation[position];
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

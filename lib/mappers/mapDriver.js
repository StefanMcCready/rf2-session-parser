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

  const { points } = options;
  const { leader, laps } = sessionDetails;
  const deduceGapToLeader = () => {
    if (position !== 1) {
      return gapToFirst({ BestLapTime, FinishTime, Laps }, leader, laps, session);
    }
  }

  const position = stripAndParse(Position);
  const fastestTime = fastestLap(BestLapTime);
  const gapToLeader = deduceGapToLeader();

  const deducePoints = () => {
    let pointsAwarded = {};

    if (points) {
      if (session === 'qualifying' && position === 1 && points.bonus.polePosition) {
        pointsAwarded = {
          ...pointsAwarded,
          polePosition:  points.bonus.polePosition
        }
      } else if (session === 'race') {
        pointsAwarded = {
          ...pointsAwarded,
          racePosition: points.standardAllocation[position]
        }
      }
      return pointsAwarded;
    } else {
      return undefined
    }
  }

  const pointsAwarded = deducePoints();

  const coreData = {
    position,
    name: stripValue(Name),
    team: stripValue(TeamName),
    fastestTime,
    gapToLeader,
    pointsAwarded
  }

  if (session === 'race') {
    const finishTime = raceTime(FinishStatus, FinishTime);
    const positionsMoved = stripValue(GridPos) - stripValue(Position);

    return {
      ...coreData,
      gridPosition: stripAndParse(GridPos),
      finishTime,
      positionsMoved
    }
  } else {
    return {
      ...coreData
    }
  }
}

const stripValue = require('./stripValue');
const formatTime = require('./formatTime');

const formatGap = (time, leadersTime, includeHours) => {
  const gapToLeader = parseFloat(time) - parseFloat(leadersTime);
  return formatTime(gapToLeader.toFixed(3), includeHours);
}

module.exports = (driver, leader, sessionLapCount, session) => {
  const { BestLapTime, FinishTime } = driver;
  if (session === 'race' && driversTime) {
    const lapsDown = parseInt(sessionLapCount) - parseInt(driversLapCount);

    if (lapsDown === 0) {
      return formatGap(stripValue(FinishTime), stripValue(leader.FinishTime), true);
    }

    if (lapsDown > 0) {
      return `-${lapsDown}L`
    }
  }

  if (session === 'qualifying' && BestLapTime) {
    return formatGap(stripValue(BestLapTime), stripValue(leader.BestLapTime));
  }
}

const stripValue = require('./stripValue');
const formatTime = require('./formatTime');

const formatGap = (time, leadersTime) => {
    const gapToLeader = parseFloat(time) - parseFloat(leadersTime);
    return formatTime(gapToLeader.toFixed(3), true);
}

module.exports = (driversTime, leadersTime, driversLapCount, lapCount, session) => {
  if (session === 'race' && driversTime) {
    const lapsDown = parseInt(lapCount) - parseInt(driversLapCount);

    if (lapsDown === 0) {
      return formatGap(driversTime, leadersTime);
    }

    if (lapsDown > 0) {
      return `-${lapsDown}L`
    }
  }

  if (session === 'qualifying') {
    return formatGap(driversTime, leadersTime);
  }
}

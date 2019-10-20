const stripValue = require('./stripValue');
const formatTime = require('./formatTime');

const formatGap = (time, leadersTime) => {
    const gapToLeader = (parseFloat(time)) - (parseFloat(leadersTime));
    return formatTime(gapToLeader.toFixed(3));
}

module.exports = (driversTime, leadersTime, driversLapCount, lapCount, session) => {
  if (session === 'Race') {
    const lapsDown = parseInt(stripValue(lapCount)) - parseInt(driversLapCount);

    if (lapsDown === 0) {
      return formatGap(driversTime, leadersTime);
    }

    if (lapsDown > 0) {
      return `-${lapsDown}L`
    } 
  }

  if (session === 'Qualifying') {
    return formatGap(driversTime, leadersTime);
  }
}
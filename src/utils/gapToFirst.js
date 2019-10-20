import { stripValue } from './stripValue';
import { formatTime } from './formatTime';

const formatGap = (time, leadersTime) => {
    const gapToLeader = (parseFloat(time)) - (parseFloat(leadersTime));
    return formatTime(gapToLeader.toFixed(3));
}

export const gapToFirst = (driversTime, leadersTime, driversLapCount, lapCount, session) => {
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

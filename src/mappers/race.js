import { stripValue } from '../utils/stripValue';
import { gapToFirst } from '../utils/gapToFirst';
import { formatTime } from '../utils/formatTime';

export const raceMapping = (driver, leaderFinishTime, raceLaps, session) => {
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

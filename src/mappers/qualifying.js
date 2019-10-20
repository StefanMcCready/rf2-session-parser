const stripValue = require('../utils/stripValue');
const formatTime = require('../utils/formatTime');
import { gapToFirst } from  '../utils/gapToFirst';

export const qualiMapping = (driver, fastestLap, session) => {
  const { Name, TeamName, Position, BestLapTime, CarType } = driver;

  return {
    position: stripValue(Position),
    name: stripValue(Name),
    team: stripValue(TeamName),
    fastestLap: BestLapTime ? formatTime(stripValue(BestLapTime)) : 'No Time Set',
    gapToFirst: BestLapTime ? gapToFirst(stripValue(BestLapTime), stripValue(fastestLap), null, null, session) : 'No Time Set',
    car: stripValue(CarType)
  }
}

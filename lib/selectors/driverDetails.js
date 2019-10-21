const raceMapping = require('../mappers/race');
const qualiMapping = require('../mappers/qualifying');
const stripValue = require('../utils/stripValue');

module.exports = (results, session, options) => {
  if (session === 'Qualifying') {

    const sortedByPosition = arr => arr.sort((a, b) => { return stripValue(a.Position) - stripValue(b.Position) });
    const sortedResult = sortedByPosition(results.Qualify.Driver);

    const driverData = sortedResult.map(driver => {
      const fastestLap = results.Qualify.Driver[0].BestLapTime;
      return qualiMapping(driver, fastestLap, session);
    });

    return driverData;
  }

  if (session === 'Race') {
    const sortedByPosition = arr => arr.sort((a, b) => { return stripValue(a.ClassPosition) - stripValue(b.ClassPosition) });
    const sortedResult = sortedByPosition(results.Race.Driver);

    const driverData = sortedResult.map(driver => {
      const leaderFinishTime = results.Race.Driver[0].FinishTime;
      return raceMapping(driver, leaderFinishTime, results.RaceLaps, session, options);
    });

    return driverData;
  }
}

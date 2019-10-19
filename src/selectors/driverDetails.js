const stripValue = require('../utils/stripValue');
const raceMapping = require('../mappers/race');
const qualiMapping = require('../mappers/qualifying');

const sortedByPosition = arr => arr.sort((a, b) => { return a.position - b.position });

module.exports = (results, session) => {
  if (session === 'Qualifying') {
    const driverData = results.Qualify.Driver.map(driver => {
      return qualiMapping(driver);
    });

    const sortedResult = sortedByPosition(driverData);

    return sortedResult;
  }

  if (session === 'Race') {
    const driverData = results.Race.Driver.map(driver => {
      return raceMapping(driver);
    });

    const sortedResult = sortedByPosition(driverData);

    return sortedResult;
  }
}
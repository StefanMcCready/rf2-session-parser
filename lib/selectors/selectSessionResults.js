const mapDriver = require('../mappers/mapDriver');
const stripAndParse = require('../utils/stripAndParse');
const stripValue = require('../utils/stripValue');

module.exports = (data, options) => {
  const session = data.Race || data.Qualify;
  
  const findFastestLap = () => {
    const sorted = session.Driver.sort((a, b) => (stripValue(a.BestLapTime) > stripValue(b.BestLapTime)) ? 1 : -1);
    return sorted[0];
  }

  const sortResults = () => {
    const sortedResults = session.Driver.sort((a, b) => (stripAndParse(a.Position) > stripAndParse(b.Position)) ? 1 : -1);
    return sortedResults;
  }

  const fastestLap = findFastestLap();
  const sortedResults = sortResults();
  
  const keySessionDetails = {
    leader: {
      ...sortedResults[0]
    },
    laps: session.Laps,
    fastestLap
  }

  let results = [];

  sortedResults.forEach(driver => {
    results.push(mapDriver(driver, options, data.Race ? 'race' : 'qualifying', keySessionDetails));
  });

  return results;
}
const mapDriver = require('../mappers/mapDriver');
const stripAndParse = require('../utils/stripAndParse');

module.exports = (data, options) => {
  const session = data.Race || data.Qualify;
  const sortedResults = session.Driver.sort((a, b) => (stripAndParse(a.Position) > stripAndParse(b.Position)) ? 1 : -1);
  console.log(sortedResults);
  const keySessionDetails = {
    leader: {
      ...sortedResults[0]
    },
    laps: session.Laps
  }
  let results = [];

  sortedResults.forEach(driver => {
    results.push(mapDriver(driver, options, data.Race ? 'race' : 'qualifying', keySessionDetails));
  });

  return results
}
const mapDriver = require('../mappers/mapDriver');

module.exports = (data, options) => {
  const sessionResults = data.Race || data.Qualify;
  let unsortedResults = [];

  sessionResults.Driver.forEach(driver => {
    unsortedResults.push(mapDriver(driver, options, data.Race ? 'race' : 'qualifying'));
  });

  const results = unsortedResults.sort((a, b) => (a.position > b.position) ? 1 : -1);

  return results
}
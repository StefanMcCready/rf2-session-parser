const convert = require('xml-js');

const stripValue = require('./utils/stripValue');
const selectDriverDetails = require('./selectors/driverDetails');
const selectRaceDetails = require('./selectors/raceDetails');

module.exports = (data) => {
  const parsedData = convert.xml2js(data, { compact: true, spaces: 4 });
  const results = parsedData.rFactorXML.RaceResults;

  const isQualifying = results.Qualify !== undefined;
  const isRace = results.Race !== undefined;

  const session = isQualifying && 'Qualifying' || isRace && 'Race';

  const resultsData = {
    event: selectRaceDetails(results, session),
    result: selectDriverDetails(results, session),
  }

  return resultsData;
}


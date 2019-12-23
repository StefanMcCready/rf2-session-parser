const convert = require('xml-js');

const determineSessionResults = require('./modules/determineSessionResults');

const getSessionData = (data, options) => {
  const session = determineSessionResults(data, options);
  return session;
}

module.exports = (data, options) => {
  const { rFactorXML: { RaceResults } } = convert.xml2js(data, { compact: true, spaces: 4 });

  return getSessionData(RaceResults, options);
};

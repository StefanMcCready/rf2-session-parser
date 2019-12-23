const selectSessionDetails = require('../selectors/selectSessionDetails');
const selectSessionResults = require('../selectors/selectSessionResults');

module.exports = (data, options) => {
  const details = selectSessionDetails(data);
  const results = selectSessionResults(data, options);

  return {
    details,
    results
  }
}
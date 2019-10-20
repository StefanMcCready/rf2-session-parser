import { convert } from 'xml-js';

import { stripValue } from './utils/stripValue';
import { selectRaceDetails } from './selectors/raceDetails';
import { selectDriverDetails } from './selectors/driverDetails';

export const parseResults = (data) => {
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

import { stripValue } from '../utils/stripValue';

export const selectRaceDetails = (results, session) => {
  const { RaceLaps, TrackEvent, ServerName, RaceTime } = results;
  
  return {
    name: stripValue(ServerName),
    location: stripValue(TrackEvent),
    session,
  }
}

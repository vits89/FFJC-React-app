import { combineReducers } from 'redux';

import { peopleReducer } from './peopleReducer';
import { planetsReducer } from './planetsReducer';
import { starshipsReducer } from './starshipsReducer';

export const combinedReducer = combineReducers({
  people: peopleReducer,
  planets: planetsReducer,
  starships: starshipsReducer
});

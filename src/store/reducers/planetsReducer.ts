import { createReducer } from 'deox';
import { v4 as uuidv4 } from 'uuid';

import {
  addPlanetAction,
  editPlanetAction,
  deletePlanetAction,
  setPlanetsAction,
} from '../actions/planetsActions';

import { IPlanet } from '../../types';

const defaultState: IPlanet[] = [];

export const planetsReducer = createReducer(defaultState, handleAction => [
  handleAction(addPlanetAction, (state, { payload: { planet } }) => {
    planet.id = uuidv4();

    return [...state, planet];
  }),
  handleAction(
    editPlanetAction,
    (state, { payload: { planet: editedPlanet } }) => {
      return state.map(planet =>
        planet.id === editedPlanet.id ? editedPlanet : planet
      );
    }
  ),
  handleAction(deletePlanetAction, (state, { payload: { id } }) => {
    return state.filter(planet => planet.id !== id);
  }),
  handleAction(setPlanetsAction, (_, { payload: { planets } }) => planets),
]);

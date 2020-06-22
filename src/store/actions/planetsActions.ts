import { createAction } from 'deox';

import { IPlanet } from '../../types';

export const addPlanetAction = createAction('ADD_PLANET', resolve => (planet: IPlanet) => resolve({ planet }));
export const editPlanetAction = createAction('EDIT_PLANET', resolve => (planet: IPlanet) => resolve({ planet }));
export const deletePlanetAction = createAction('DELETE_PLANET', resolve => (id: string) => resolve({ id }));

export const setPlanetsAction = createAction('SET_PLANETS', resolve => (planets: IPlanet[]) => resolve({ planets }));

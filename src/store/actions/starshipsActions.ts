import { createAction } from 'deox';

import { IStarship } from '../../types';

export const addStarshipAction = createAction('ADD_STARSHIP', resolve => (starship: IStarship) => {
  return resolve({ starship });
});
export const editStarshipAction = createAction('EDIT_STARSHIP', resolve => (starship: IStarship) => {
  return resolve({ starship });
});
export const deleteStarshipAction = createAction('DELETE_STARSHIP', resolve => (id: string) => resolve({ id }));

export const setStarshipsAction = createAction('SET_STARSHIPS', resolve => (starships: IStarship[]) => {
  return resolve({ starships });
});

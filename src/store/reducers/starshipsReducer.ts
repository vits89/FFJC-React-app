import { createReducer } from 'deox';
import { v4 as uuidv4 } from 'uuid';

import {
  addStarshipAction,
  editStarshipAction,
  deleteStarshipAction,
  setStarshipsAction
} from '../actions/starshipsActions';

import { IStarship } from '../../types';

const defaultState = Array<IStarship>();

export const starshipsReducer = createReducer(defaultState, handleAction => [
  handleAction(addStarshipAction, (state, { payload: { starship } }) => {
    starship.id = uuidv4();

    return [...state, starship];
  }),
  handleAction(editStarshipAction, (state, { payload: { starship: editedStarship } }) => {
    return state.map(starship => starship.id === editedStarship.id ? editedStarship : starship);
  }),
  handleAction(deleteStarshipAction, (state, { payload: { id } }) => {
    return state.filter(starship => starship.id !== id);
  }),
  handleAction(setStarshipsAction, (_, { payload: { starships } }) => starships)
]);

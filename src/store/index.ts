import { createStore } from 'redux';

import { combinedReducer } from './reducers';

import { IStore } from '../types';

const defaultState: IStore = {
  people: [],
  planets: [],
  starships: []
};

export const store = createStore(combinedReducer, defaultState);

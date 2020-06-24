import { createReducer } from 'deox';
import { v4 as uuidv4 } from 'uuid';

import {
  addPersonAction,
  editPersonAction,
  deletePersonAction,
  changePersonBelovedAction,
  setPeopleAction,
} from '../actions/peopleActions';

import { IPerson } from '../../types';

const defaultState: IPerson[] = [];

export const peopleReducer = createReducer(defaultState, handleAction => [
  handleAction(addPersonAction, (state, { payload: { person } }) => {
    person.id = uuidv4();

    return [...state, person];
  }),
  handleAction(
    editPersonAction,
    (state, { payload: { person: editedPerson } }) => {
      return state.map(person =>
        person.id === editedPerson.id ? editedPerson : person
      );
    }
  ),
  handleAction(deletePersonAction, (state, { payload: { id } }) => {
    return state.filter(person => person.id !== id);
  }),
  handleAction(changePersonBelovedAction, (state, { payload: { id } }) => {
    return state.map(person =>
      person.id === id ? { ...person, beloved: !person.beloved } : person
    );
  }),
  handleAction(setPeopleAction, (_, { payload: { people } }) => people),
]);

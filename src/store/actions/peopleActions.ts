import { createAction } from 'deox';

import { IPerson } from '../../types';

export const addPersonAction = createAction('ADD_PERSON', resolve => (person: IPerson) => resolve({ person }));
export const editPersonAction = createAction('EDIT_PERSON', resolve => (person: IPerson) => resolve({ person }));
export const deletePersonAction = createAction('DELETE_PERSON', resolve => (id: string) => resolve({ id }));
export const changePersonBelovedAction = createAction('CHANGE_PERSON_BELOVED', resolve => (id: string) => {
  return resolve({ id });
});

export const setPeopleAction = createAction('SET_PEOPLE', resolve => (people: IPerson[]) => resolve({ people }));

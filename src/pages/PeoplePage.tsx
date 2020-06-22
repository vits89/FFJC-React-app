import React, { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import { EditPersonForm, PeopleList } from '../components';

import { swApiServiceCacheDecorator } from '../services';

import {
  addPersonAction,
  editPersonAction,
  deletePersonAction,
  changePersonBelovedAction,
  setPeopleAction
} from '../store/actions/peopleActions';
import { peopleSelector } from '../store/selectors/peopleSelectors';

import { IPerson, Person } from '../types';

export const PeoplePage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const routeMatch = useRouteMatch();

  useEffect(() => {
    swApiServiceCacheDecorator<IPerson>('people', Person)
      .then(people => dispatch(setPeopleAction(people)));
  }, [dispatch]);

  const people = useSelector(peopleSelector);

  const findPerson = (id: string): IPerson | undefined => {
    if (!id) {
      return undefined;
    }

    return people.find(person => person.id === id);
  };

  const addPerson = (person: IPerson): void => {
    dispatch(addPersonAction(person));
  };
  const editPerson = (editedPerson: IPerson): void => {
    dispatch(editPersonAction(editedPerson));
  };
  const deletePerson = (id: string): void => {
    dispatch(deletePersonAction(id));
  };
  const changePersonBeloved = (id: string): void => {
    dispatch(changePersonBelovedAction(id));
  };

  return (
    <>
      <Typography component="h2" variant="h5">People from Star Wars Universe</Typography>
      <Switch>
        <Route path={ `${ routeMatch.path }/add` }>
          <EditPersonForm saveData={ addPerson } />
        </Route>
        <Route path={ `${ routeMatch.path }/:id` }>
          <EditPersonForm getInitialData={ findPerson } saveData={ editPerson } />
        </Route>
        <Route path={ routeMatch.path }>
          <PeopleList people={ people } deletePerson={ deletePerson } changePersonBeloved={ changePersonBeloved } />
        </Route>
      </Switch>
    </>
  );
};

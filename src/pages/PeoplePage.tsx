import React, { FunctionComponent, useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Typography } from '@material-ui/core';

import { EditPersonForm, PeopleList } from '../components';

import { swApiServiceCacheDecorator } from '../services';

import { IPerson, Person } from '../types';

export const PeoplePage: FunctionComponent = () => {
  const [people, setPeople] = useState(new Array<IPerson>(0));
  const routeMatch = useRouteMatch();

  useEffect(() => {
    swApiServiceCacheDecorator<IPerson>('people', Person)
      .then(people => setPeople(people));
  }, []);

  const findPerson = (id: string): IPerson | undefined => {
    if (!id) {
      return undefined;
    }

    return people.find(person => person.id === id);
  };

  const addPerson = (person: IPerson): void => {
    person.id = uuidv4();

    setPeople([...people, person]);
  };
  const editPerson = (editedPerson: IPerson): void => {
    setPeople(people.map(person => person.id === editedPerson.id ? editedPerson : person));
  };
  const deletePerson = (id: string): void => {
    setPeople(people.filter(person => person.id !== id));
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
          <PeopleList people={ people } deletePerson={ deletePerson } />
        </Route>
      </Switch>
    </>
  );
};

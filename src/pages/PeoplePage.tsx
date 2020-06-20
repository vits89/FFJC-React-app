import React, { FunctionComponent, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import faker from 'faker';

import { EditPersonForm, PeopleList } from '../components';

import { IPerson } from '../types';

const fakePeople = new Array<IPerson>(10);

for (let i = 0; i < fakePeople.length; i++) {
  fakePeople[i] = {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    height: faker.random.number(200).toString(),
    mass: faker.random.number(150).toString(),
    gender: faker.random.arrayElement(['male', 'female', 'n/a']),
    birth_year: faker.date.past().getFullYear().toString(),
    beloved: faker.random.boolean()
  };
}

export const PeoplePage: FunctionComponent = () => {
  const [people, setPeople] = useState(fakePeople);
  const routeMatch = useRouteMatch();

  const findPerson = (id: string): IPerson | undefined => {
    if (!id) {
      return undefined;
    }

    return people.find(person => person.id === id);
  };

  const addPerson = (person: IPerson): void => {
    person.id = faker.random.uuid();

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

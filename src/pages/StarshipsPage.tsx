import React, { FunctionComponent, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import faker from 'faker';

import { EditStarshipForm, StarshipsList } from '../components';

import { IStarship } from '../types';

const fakeStarships = new Array<IStarship>(10);

for (let i = 0; i < fakeStarships.length; i++) {
  fakeStarships[i] = {
    id: faker.random.uuid(),
    name: faker.random.word(),
    model: faker.random.word(),
    starship_class: faker.random.word(),
    manufacturer: faker.random.word(),
    cost_in_credits: faker.random.number(1e6).toString(),
    crew: faker.random.number(1e3).toString()
  };
}

export const StarshipsPage: FunctionComponent = () => {
  const [starships, setStarships] = useState(fakeStarships);
  const routeMatch = useRouteMatch();

  const findStarship = (id: string): IStarship | undefined => {
    if (!id) {
      return undefined;
    }

    return starships.find(starship => starship.id === id);
  };

  const addStarship = (starship: IStarship): void => {
    starship.id = faker.random.uuid();

    setStarships([...starships, starship]);
  };
  const editStarship = (editedStarship: IStarship): void => {
    setStarships(starships.map(starship => starship.id === editedStarship.id ? editedStarship : starship));
  };
  const deleteStarship = (id: string): void => {
    setStarships(starships.filter(starship => starship.id !== id));
  };

  return (
    <>
      <Typography component="h2" variant="h5">Starships from Star Wars Universe</Typography>
      <Switch>
        <Route path={ `${ routeMatch.path }/add` }>
          <EditStarshipForm saveData={ addStarship } />
        </Route>
        <Route path={ `${ routeMatch.path }/:id` }>
          <EditStarshipForm getInitialData={ findStarship } saveData={ editStarship } />
        </Route>
        <Route path={ routeMatch.path }>
          <StarshipsList starships={ starships } deleteStarship={ deleteStarship } />
        </Route>
      </Switch>
    </>
  );
};

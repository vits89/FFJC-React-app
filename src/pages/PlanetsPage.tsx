import React, { FunctionComponent, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import faker from 'faker';

import { EditPlanetForm, PlanetsList } from '../components';

import { IPlanet } from '../types';

const fakePlanets = new Array<IPlanet>(10);

for (let i = 0; i < fakePlanets.length; i++) {
  fakePlanets[i] = {
    id: faker.random.uuid(),
    name: faker.random.word(),
    climate: faker.random.words(),
    terrain: faker.random.words(),
    diameter: faker.random.number(50e3).toString(),
    population: faker.random.number(1e9).toString(),
    created: faker.date.past().toString()
  };
}

export const PlanetsPage: FunctionComponent = () => {
  const [planets, setPlanets] = useState(fakePlanets);
  const routeMatch = useRouteMatch();

  const findPlanet = (id: string): IPlanet | undefined => {
    if (!id) {
      return undefined;
    }

    return planets.find(planet => planet.id === id);
  };

  const addPlanet = (planet: IPlanet): void => {
    planet.id = faker.random.uuid();

    setPlanets([...planets, planet]);
  };
  const editPlanet = (editedPlanet: IPlanet): void => {
    setPlanets(planets.map(planet => planet.id === editedPlanet.id ? editedPlanet : planet));
  };
  const deletePlanet = (id: string): void => {
    setPlanets(planets.filter(planet => planet.id !== id));
  };

  return (
    <>
      <Typography component="h2" variant="h5">Planets from Star Wars Universe</Typography>
      <Switch>
        <Route path={ `${ routeMatch.path }/add` }>
          <EditPlanetForm saveData={ addPlanet } />
        </Route>
        <Route path={ `${ routeMatch.path }/:id` }>
          <EditPlanetForm getInitialData={ findPlanet } saveData={ editPlanet } />
        </Route>
        <Route path={ routeMatch.path }>
          <PlanetsList planets={ planets } deletePlanet={ deletePlanet } />
        </Route>
      </Switch>
    </>
  );
};

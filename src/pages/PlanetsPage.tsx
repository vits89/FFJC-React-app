import React, { FunctionComponent, useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Typography } from '@material-ui/core';

import { EditPlanetForm, PlanetsList } from '../components';

import { swApiServiceCacheDecorator } from '../services';

import { IPlanet, Planet } from '../types';

export const PlanetsPage: FunctionComponent = () => {
  const [planets, setPlanets] = useState(new Array<IPlanet>(0));
  const routeMatch = useRouteMatch();

  useEffect(() => {
    swApiServiceCacheDecorator<IPlanet>('planets', Planet)
      .then(planets => setPlanets(planets));
  }, []);

  const findPlanet = (id: string): IPlanet | undefined => {
    if (!id) {
      return undefined;
    }

    return planets.find(planet => planet.id === id);
  };

  const addPlanet = (planet: IPlanet): void => {
    planet.id = uuidv4();

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

import React, { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import { EditPlanetForm, PlanetsList } from '../components';

import { swApiServiceCacheDecorator } from '../services';

import {
  addPlanetAction,
  editPlanetAction,
  deletePlanetAction,
  setPlanetsAction
} from '../store/actions/planetsActions';
import { planetsSelector } from '../store/selectors/planetsSelector';

import { IPlanet, Planet } from '../types';

export const PlanetsPage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const routeMatch = useRouteMatch();

  useEffect(() => {
    swApiServiceCacheDecorator<IPlanet>('planets', Planet)
      .then(planets => dispatch(setPlanetsAction(planets)));
  }, [dispatch]);

  const planets = useSelector(planetsSelector);

  const findPlanet = (id: string): IPlanet | undefined => {
    if (!id) {
      return undefined;
    }

    return planets.find(planet => planet.id === id);
  };

  const addPlanet = (planet: IPlanet): void => {
    dispatch(addPlanetAction(planet));
  };
  const editPlanet = (editedPlanet: IPlanet): void => {
    dispatch(editPlanetAction(editedPlanet));
  };
  const deletePlanet = (id: string): void => {
    dispatch(deletePlanetAction(id));
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

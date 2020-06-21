import React, { FunctionComponent, useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Typography } from '@material-ui/core';

import { EditStarshipForm, StarshipsList } from '../components';

import { swApiServiceCacheDecorator } from '../services';

import { IStarship, Starship } from '../types';

export const StarshipsPage: FunctionComponent = () => {
  const [starships, setStarships] = useState(new Array<IStarship>(0));
  const routeMatch = useRouteMatch();

  useEffect(() => {
    swApiServiceCacheDecorator<IStarship>('starships', Starship)
      .then(starships => setStarships(starships));
  }, []);

  const findStarship = (id: string): IStarship | undefined => {
    if (!id) {
      return undefined;
    }

    return starships.find(starship => starship.id === id);
  };

  const addStarship = (starship: IStarship): void => {
    starship.id = uuidv4();

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

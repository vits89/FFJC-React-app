import React, { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import { EditStarshipForm, StarshipsList } from '../components';

import { swApiServiceCacheDecorator } from '../services';

import {
  addStarshipAction,
  editStarshipAction,
  deleteStarshipAction,
  setStarshipsAction,
} from '../store/actions/starshipsActions';
import { starshipsSelector } from '../store/selectors/starshipsSelector';

import { IStarship, Starship } from '../types';

export const StarshipsPage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const routeMatch = useRouteMatch();

  useEffect(() => {
    swApiServiceCacheDecorator<IStarship>(
      'starships',
      Starship
    ).then(starships => dispatch(setStarshipsAction(starships)));
  }, [dispatch]);

  const starships = useSelector(starshipsSelector);

  const findStarship = (id: string): IStarship | undefined => {
    if (!id) {
      return undefined;
    }

    return starships.find(starship => starship.id === id);
  };

  const addStarship = (starship: IStarship): void => {
    dispatch(addStarshipAction(starship));
  };
  const editStarship = (editedStarship: IStarship): void => {
    dispatch(editStarshipAction(editedStarship));
  };
  const deleteStarship = (id: string): void => {
    dispatch(deleteStarshipAction(id));
  };

  return (
    <>
      <Typography component="h2" variant="h5">
        Starships from Star Wars Universe
      </Typography>
      <Switch>
        <Route path={`${routeMatch.path}/add`}>
          <EditStarshipForm saveData={addStarship} />
        </Route>
        <Route path={`${routeMatch.path}/:id`}>
          <EditStarshipForm
            getInitialData={findStarship}
            saveData={editStarship}
          />
        </Route>
        <Route path={routeMatch.path}>
          <StarshipsList
            starships={starships}
            deleteStarship={deleteStarship}
          />
        </Route>
      </Switch>
    </>
  );
};

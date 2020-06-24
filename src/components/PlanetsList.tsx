import React, { FunctionComponent } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { Box, Button, Typography } from '@material-ui/core';

import { Table } from './common';

import { IPlanet } from '../types';

const columnNames = {
  name: 'Name',
  climate: 'Climate',
  terrain: 'Terrain',
  diameter: 'Diameter',
  population: 'Population',
  created: 'Created',
  id: 'ID',
};

type PlanetsListComponentProps = {
  planets: IPlanet[];
  deletePlanet?: (id: string) => void;
};

export const PlanetsList: FunctionComponent<PlanetsListComponentProps> = ({
  planets,
  deletePlanet,
}) => {
  const history = useHistory();
  const routeMatch = useRouteMatch();

  return (
    <>
      <Box marginY={1}>
        <Button
          variant="contained"
          onClick={() => history.push(`${routeMatch.path}/add`)}
        >
          Add planet
        </Button>
      </Box>
      {planets.length > 0 ? (
        <Table
          columnNames={columnNames}
          rowData={planets}
          deleteRow={deletePlanet}
        />
      ) : (
        <Typography variant="body1">No data provided.</Typography>
      )}
    </>
  );
};

import React, { FunctionComponent } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { Box, Button, Typography } from '@material-ui/core';

import { Table } from './common';

import { IStarship } from '../types';

const columnNames = {
  name: 'Name',
  model: 'Model',
  starship_class: 'Class',
  manufacturer: 'Manufacturer',
  cost_in_credits: 'Cost',
  crew: 'Crew',
  id: 'ID',
};

type StarshipsListComponentProps = {
  starships: IStarship[];
  deleteStarship?: (id: string) => void;
};

export const StarshipsList: FunctionComponent<StarshipsListComponentProps> = ({
  starships,
  deleteStarship,
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
          Add starship
        </Button>
      </Box>
      {starships.length > 0 ? (
        <Table
          columnNames={columnNames}
          rowData={starships}
          deleteRow={deleteStarship}
        />
      ) : (
        <Typography variant="body1">No data provided.</Typography>
      )}
    </>
  );
};

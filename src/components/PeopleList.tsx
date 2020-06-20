import React, { FunctionComponent } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { Box, Button, Typography } from '@material-ui/core';

import { Table } from './common'

import { IPerson } from '../types';

const columnNames = {
  name: 'Name',
  height: 'Height',
  mass: 'Mass',
  gender: 'Gender',
  birth_year: 'Birth year',
  beloved: 'Beloved',
  id: 'ID'
};

type PeopleListComponentProps = {
  people: IPerson[],
  deletePerson?: (id: string) => void;
};

export const PeopleList: FunctionComponent<PeopleListComponentProps> = ({ people, deletePerson }) => {
  const history = useHistory();
  const routeMatch = useRouteMatch();

  return (
    <>
      <Box marginY={1}>
        <Button variant="contained" onClick={ () => history.push(`${ routeMatch.path }/add`) }>Add person</Button>
      </Box>
      { people.length > 0 ?
        <Table columnNames={ columnNames } rowData={ people } deleteRow={ deletePerson } /> :
        <Typography variant="body1">No data provided.</Typography> }
    </>
  );
};

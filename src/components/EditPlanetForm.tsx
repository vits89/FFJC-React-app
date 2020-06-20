import React, { FunctionComponent, ChangeEvent, SyntheticEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Box, Button, TextField, Typography } from '@material-ui/core';

import { IPlanet } from '../types';

type EditPlanetComponentProps = {
  getInitialData?: (id: string) => IPlanet | undefined;
  saveData: (person: IPlanet) => void;
}

export const EditPlanetForm: FunctionComponent<EditPlanetComponentProps> = ({ getInitialData, saveData }) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const initialData = (id && getInitialData && getInitialData(id)) || {
    id: '',
    name: '',
    climate: '',
    terrain: '',
    diameter: '',
    population: '',
    created: ''
  };

  const [data, setData] = useState(initialData);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { target: { name, value } } = event;

    setData({ ...data, [name]: value });
  };
  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    saveData(data);

    history.push('/planets');
  };

  return (
    <>
      <Typography component="h3" variant="h6">{ initialData.id ? 'Edit' : 'Add' } planet</Typography>
      <Box marginY={1}>
        <Button variant="contained" onClick={ () => history.goBack() }>Return</Button>
      </Box>
      <form noValidate onSubmit={ handleSubmit }>
        <TextField
          variant="outlined"
          name="name"
          value={ data.name }
          fullWidth
          margin="normal"
          onChange={ handleChange }
          label="Name"
        />
        <TextField
          variant="outlined"
          name="climate"
          value={ data.climate }
          fullWidth
          margin="normal"
          onChange={ handleChange }
          label="Climate"
        />
        <TextField
          variant="outlined"
          name="terrain"
          value={ data.terrain }
          fullWidth
          margin="normal"
          onChange={ handleChange }
          label="Terrain"
        />
        <TextField
          variant="outlined"
          name="diameter"
          value={ data.diameter }
          fullWidth
          margin="normal"
          onChange={ handleChange }
          label="Diameter"
        />
        <TextField
          variant="outlined"
          name="population"
          value={ data.population }
          fullWidth
          margin="normal"
          onChange={ handleChange }
          label="Population"
        />
        <TextField
          variant="outlined"
          name="created"
          value={ data.created }
          fullWidth
          margin="normal"
          onChange={ handleChange }
          label="Created"
        />
        <Box marginY={1}>
          <Button type="submit" variant="contained">Save</Button>
        </Box>
      </form>
    </>
  );
};

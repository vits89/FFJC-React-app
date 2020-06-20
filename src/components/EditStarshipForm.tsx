import React, { FunctionComponent, ChangeEvent, SyntheticEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Box, Button, TextField, Typography } from '@material-ui/core';

import { IStarship } from '../types';

type EditStarshipComponentProps = {
  getInitialData?: (id: string) => IStarship | undefined;
  saveData: (person: IStarship) => void;
}

export const EditStarshipForm: FunctionComponent<EditStarshipComponentProps> = ({ getInitialData, saveData }) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const initialData = (id && getInitialData && getInitialData(id)) || {
    id: '',
    name: '',
    model: '',
    starship_class: '',
    manufacturer: '',
    cost_in_credits: '',
    crew: ''
  };

  const [data, setData] = useState(initialData);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { target: { name, value } } = event;

    setData({ ...data, [name]: value });
  };
  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    saveData(data);

    history.push('/starships');
  };

  return (
    <>
      <Typography component="h3" variant="h6">{ initialData.id ? 'Edit' : 'Add' } starship</Typography>
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
          name="model"
          value={ data.model }
          fullWidth
          margin="normal"
          onChange={ handleChange }
          label="Model"
        />
        <TextField
          variant="outlined"
          name="starship_class"
          value={ data.starship_class }
          fullWidth
          margin="normal"
          onChange={ handleChange }
          label="Class"
        />
        <TextField
          variant="outlined"
          name="manufacturer"
          value={ data.manufacturer }
          fullWidth
          margin="normal"
          onChange={ handleChange }
          label="Manufacturer"
        />
        <TextField
          variant="outlined"
          name="cost_in_credits"
          value={ data.cost_in_credits }
          fullWidth
          margin="normal"
          onChange={ handleChange }
          label="Cost"
        />
        <TextField
          variant="outlined"
          name="crew"
          value={ data.crew }
          fullWidth
          margin="normal"
          onChange={ handleChange }
          label="Crew"
        />
        <Box marginY={1}>
          <Button type="submit" variant="contained">Save</Button>
        </Box>
      </form>
    </>
  );
};

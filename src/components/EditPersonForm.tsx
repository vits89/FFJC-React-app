import React, { FunctionComponent, ChangeEvent, SyntheticEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Box, Button, Checkbox, FormControl, FormControlLabel, TextField, Typography } from '@material-ui/core';

import { IPerson } from '../types';

type EditPersonComponentProps = {
  getInitialData?: (id: string) => IPerson | undefined;
  saveData: (person: IPerson) => void;
}

export const EditPersonForm: FunctionComponent<EditPersonComponentProps> = ({ getInitialData, saveData }) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const initialData = (id && getInitialData && getInitialData(id)) || {
    id: '',
    name: '',
    height: '',
    mass: '',
    gender: '',
    birth_year: '',
    beloved: false
  };

  const [data, setData] = useState(initialData);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { target: { checked, name, type, value } } = event;

    setData({ ...data, [name]: type === 'checkbox' ? checked : value });
  };
  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    saveData(data);

    history.push('/people');
  };

  return (
    <>
      <Typography component="h3" variant="h6">{ initialData.id ? 'Edit' : 'Add' } person</Typography>
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
          name="height"
          value={ data.height }
          fullWidth
          margin="normal"
          onChange={ handleChange }
          label="Height"
        />
        <TextField
          variant="outlined"
          name="mass"
          value={ data.mass }
          fullWidth
          margin="normal"
          onChange={ handleChange }
          label="Mass"
        />
        <TextField
          variant="outlined"
          name="gender"
          value={ data.gender }
          fullWidth
          margin="normal"
          onChange={ handleChange }
          label="Gender"
        />
        <TextField
          variant="outlined"
          name="birth_year"
          value={ data.birth_year }
          fullWidth
          margin="normal"
          onChange={ handleChange }
          label="Birth year"
        />
        <FormControl fullWidth>
          <FormControlLabel label="Beloved" control={
            <Checkbox name="beloved" checked={ data.beloved } color="default" onChange={ handleChange } />
          } />
        </FormControl>
        <Box marginY={1}>
          <Button type="submit" variant="contained">Save</Button>
        </Box>
      </form>
    </>
  );
};

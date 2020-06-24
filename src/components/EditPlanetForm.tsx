import React, { FunctionComponent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Box, Button, TextField, Typography } from '@material-ui/core';

import { IPlanet, Planet } from '../types';

type EditPlanetComponentProps = {
  getInitialData?: (id: string) => IPlanet | undefined;
  saveData: (person: IPlanet) => void;
};

export const EditPlanetForm: FunctionComponent<EditPlanetComponentProps> = ({
  getInitialData,
  saveData,
}) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const initialData =
    (id && getInitialData && getInitialData(id)) || new Planet();

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: Yup.object({
      name: Yup.string().trim().required(),
      climate: Yup.string().trim().required(),
      terrain: Yup.string().trim().required(),
      diameter: Yup.number().positive().required(),
      population: Yup.number().positive().required(),
      created: Yup.date().max(new Date()).required(),
    }),
    onSubmit: (values: IPlanet): void => {
      saveData(values);

      history.push('/planets');
    },
  });

  return (
    <>
      <Typography component="h3" variant="h6">
        {initialData.id ? 'Edit' : 'Add'} planet
      </Typography>
      <Box marginY={1}>
        <Button variant="contained" onClick={() => history.goBack()}>
          Return
        </Button>
      </Box>
      <form noValidate onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Name"
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          {...formik.getFieldProps('name')}
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Climate"
          error={Boolean(formik.touched.climate && formik.errors.climate)}
          helperText={formik.touched.climate && formik.errors.climate}
          {...formik.getFieldProps('climate')}
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Terrain"
          error={Boolean(formik.touched.terrain && formik.errors.terrain)}
          helperText={formik.touched.terrain && formik.errors.terrain}
          {...formik.getFieldProps('terrain')}
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Diameter"
          error={Boolean(formik.touched.diameter && formik.errors.diameter)}
          helperText={formik.touched.diameter && formik.errors.diameter}
          {...formik.getFieldProps('diameter')}
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Population"
          error={Boolean(formik.touched.population && formik.errors.population)}
          helperText={formik.touched.population && formik.errors.population}
          {...formik.getFieldProps('population')}
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Created"
          error={Boolean(formik.touched.created && formik.errors.created)}
          helperText={formik.touched.created && formik.errors.created}
          {...formik.getFieldProps('created')}
        />
        <Box marginY={1}>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </form>
    </>
  );
};

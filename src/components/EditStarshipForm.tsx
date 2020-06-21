import React, { FunctionComponent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Box, Button, TextField, Typography } from '@material-ui/core';

import { IStarship, Starship } from '../types';

type EditStarshipComponentProps = {
  getInitialData?: (id: string) => IStarship | undefined;
  saveData: (person: IStarship) => void;
}

export const EditStarshipForm: FunctionComponent<EditStarshipComponentProps> = ({ getInitialData, saveData }) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const initialData = (id && getInitialData && getInitialData(id)) || new Starship();

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: Yup.object({
      name: Yup.string().trim().required(),
      model: Yup.string().trim().required(),
      starship_class: Yup.string().trim().required(),
      manufacturer: Yup.string().trim().required(),
      cost_in_credits: Yup.number().positive(),
      crew: Yup.string().trim().required()
    }),
    onSubmit: (values: IStarship): void => {
      saveData(values);

      history.push('/starships');
    }
  });

  return (
    <>
      <Typography component="h3" variant="h6">{ initialData.id ? 'Edit' : 'Add' } starship</Typography>
      <Box marginY={1}>
        <Button variant="contained" onClick={ () => history.goBack() }>Return</Button>
      </Box>
      <form noValidate onSubmit={ formik.handleSubmit }>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Name"
          error={ Boolean(formik.touched.name && formik.errors.name) }
          helperText={ formik.touched.name && formik.errors.name }
          { ...formik.getFieldProps('name') }
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Model"
          error={ Boolean(formik.touched.model && formik.errors.model) }
          helperText={ formik.touched.model && formik.errors.model }
          { ...formik.getFieldProps('model') }
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Class"
          error={ Boolean(formik.touched.starship_class && formik.errors.starship_class) }
          helperText={ formik.touched.starship_class && formik.errors.starship_class }
          { ...formik.getFieldProps('starship_class') }
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Manufacturer"
          error={ Boolean(formik.touched.manufacturer && formik.errors.manufacturer) }
          helperText={ formik.touched.manufacturer && formik.errors.manufacturer }
          { ...formik.getFieldProps('manufacturer') }
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Cost"
          error={ Boolean(formik.touched.cost_in_credits && formik.errors.cost_in_credits) }
          helperText={ formik.touched.cost_in_credits && formik.errors.cost_in_credits }
          { ...formik.getFieldProps('cost_in_credits') }
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Crew"
          error={ Boolean(formik.touched.crew && formik.errors.crew) }
          helperText={ formik.touched.crew && formik.errors.crew }
          { ...formik.getFieldProps('crew') }
        />
        <Box marginY={1}>
          <Button type="submit" variant="contained">Save</Button>
        </Box>
      </form>
    </>
  );
};

import React, { FunctionComponent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Box, Button, Checkbox, FormControl, FormControlLabel, TextField, Typography } from '@material-ui/core';

import { IPerson, Person } from '../types';

type EditPersonComponentProps = {
  getInitialData?: (id: string) => IPerson | undefined;
  saveData: (person: IPerson) => void;
}

export const EditPersonForm: FunctionComponent<EditPersonComponentProps> = ({ getInitialData, saveData }) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const initialData = (id && getInitialData && getInitialData(id)) || new Person();

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: Yup.object({
      name: Yup.string().trim().required(),
      height: Yup.number().positive().required(),
      mass: Yup.number().positive().required(),
      gender: Yup.mixed().oneOf(['male', 'female', 'n/a'] as const).required(),
      birth_year: Yup.string().trim().required()
    }),
    onSubmit: (values: IPerson): void => {
      saveData(values);

      history.push('/people');
    }
  });

  return (
    <>
      <Typography component="h3" variant="h6">{ initialData.id ? 'Edit' : 'Add' } person</Typography>
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
          label="Height"
          error={ Boolean(formik.touched.height && formik.errors.height) }
          helperText={ formik.touched.height && formik.errors.height }
          { ...formik.getFieldProps('height') }
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Mass"
          error={ Boolean(formik.touched.mass && formik.errors.mass) }
          helperText={ formik.touched.mass && formik.errors.mass }
          { ...formik.getFieldProps('mass') }
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Gender"
          error={ Boolean(formik.touched.gender && formik.errors.gender) }
          helperText={ formik.touched.gender && formik.errors.gender }
          { ...formik.getFieldProps('gender') }
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Birth year"
          error={ Boolean(formik.touched.birth_year && formik.errors.birth_year) }
          helperText={ formik.touched.birth_year && formik.errors.birth_year }
          { ...formik.getFieldProps('birth_year') }
        />
        <FormControl fullWidth>
          <FormControlLabel label="Beloved" control={
            <Checkbox color="default" { ...formik.getFieldProps('beloved') } />
          } />
        </FormControl>
        <Box marginY={1}>
          <Button type="submit" variant="contained">Save</Button>
        </Box>
      </form>
    </>
  );
};

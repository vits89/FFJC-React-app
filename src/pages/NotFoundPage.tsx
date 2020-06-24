import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button, Typography } from '@material-ui/core';

export const NotFoundPage: FunctionComponent = () => {
  const history = useHistory();

  return (
    <>
      <Typography component="h2" variant="h5">
        Page not found
      </Typography>
      <Box marginY={1}>
        <Button variant="contained" onClick={() => history.goBack()}>
          Return
        </Button>
      </Box>
    </>
  );
};

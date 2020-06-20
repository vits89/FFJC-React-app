import React, { FunctionComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Link, Toolbar, Typography, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }: Theme) => ({
  link: { margin: spacing(0, 1.5) },
  title: { textTransform: 'uppercase' }
}))

export const NavBar: FunctionComponent = () => {
  const styles = useStyles();

  return (
    <AppBar color="default" elevation={1} position="static">
      <Toolbar>
        <Typography className={ styles.title } variant="h6" component="h1">Jedi</Typography>
        <nav>
          <Link className={ styles.link } color="textPrimary" variant="button" component={ RouterLink } to="/people">
            People
          </Link>
          <Link className={ styles.link } color="textPrimary" variant="button" component={ RouterLink } to="/planets">
            Planets
          </Link>
          <Link
            className={ styles.link }
            color="textPrimary"
            variant="button"
            component={ RouterLink }
            to="/starships"
          >
            Starships
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

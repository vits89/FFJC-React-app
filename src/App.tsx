import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { Container, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { NavBar } from './components';

import { NotFoundPage, PeoplePage, PlanetsPage, StarshipsPage } from './pages';

import { store } from './store';

const useStyles = makeStyles(({ spacing }: Theme) => ({
  container: {
    paddingBottom: spacing(2),
    paddingTop: spacing(2),
  },
}));

const App: FunctionComponent = () => {
  const styles = useStyles();

  return (
    <Router>
      <NavBar />
      <Container className={styles.container} maxWidth="lg">
        <Provider store={store}>
          <Switch>
            <Route path="/people" component={PeoplePage} />
            <Route path="/planets" component={PlanetsPage} />
            <Route path="/starships" component={StarshipsPage} />
            <Route path="/" exact render={() => <Redirect to="/people" />} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Provider>
      </Container>
    </Router>
  );
};

export default App;

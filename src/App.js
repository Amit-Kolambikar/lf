import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import ProductsGrid from './components/ProductsGrid'
import Header from './components/Header'
import history from './history'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
 
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="mainContainer">
          <Header/>
          <Router history={history}>
            <Switch>
              <Route path="" component={ProductsGrid} />
              <Route component={() => <div>404 Not found</div>} />
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

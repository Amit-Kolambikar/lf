import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import ProductsGrid from './components/ProductsGrid'
import ProductItem from './components/ProductItem'
import Header from './components/Header'
import Checkout from './components/Checkout'
import Payment from './components/Payment'
import history from './history'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import configureStore from './store';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
 
});

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
      <MuiThemeProvider theme={theme}>
        <div className="mainContainer">
        <ToastContainer />
          <Header history={history}/>
          <Router history={history}>
            <Switch>
              <Route path="/products/:id" component={ProductItem} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/payment" component={Payment} />
              <Route path="" component={ProductsGrid} />
              <Route component={() => <div>404 Not found</div>} />
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Discover from './main/discover/discover';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { MainNav } from './shared/shared.module';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>
            <b>on</b>CINEMA
          </h1>
        </header>
        <BrowserRouter>
          <div>
            <MainNav />
            <Switch>
              <Route strict exact path='/:genre' component={Discover} />
              <Route render={() => <Redirect to='/action' />} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

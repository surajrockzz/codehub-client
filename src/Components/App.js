import React, { Component } from 'react';

import {BrowserRouter,Route} from 'react-router-dom';

import './App.css';
import Home from './Home.js'
import Login from './Login.js'
import SignUp from './SignUp.js'
import Test from './Test.js'
import Header from './Header.js'
import DashBoard from './Dashboard.js'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
            <Header/>
            <Route exact path="/" component={Home}/>
            <Route path="/dashboard" component={DashBoard}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/test" component={Test}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

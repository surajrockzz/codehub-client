import React, { Component } from 'react';

import {BrowserRouter,Route} from 'react-router-dom';

import './App.css';
import Home from './Home.js'
import Login from './Login.js'
import SignUp from './SignUp.js'
import Test from './Test.js'
import NavbarCom from './NavbarCom.js'
import DashBoard from './Dashboard.js'
import Logout from './Logout.js'
import users from './users.js'
import AssignmentsList from './assignmentsList.js'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
            <NavbarCom token={window.localStorage.getItem("JWT")}/>
            <Route exact path="/" component={Home}/>
            <Route path="/dashboard" render={(props) => <DashBoard {...props} isAuthed={true} token={window.localStorage.getItem("JWT")} />}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/test" component={Test}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/users" component={users}/>
            <Route path="/assignments" render={(props) => <AssignmentsList {...props}  token={window.localStorage.getItem("JWT")}/>}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

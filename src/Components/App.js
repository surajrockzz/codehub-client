import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import Home from './Home/Home.js'
import Login from './Login/Login.js'
import SignUp from './Signup/SignUp.js'
import Test from './Test/Test.js'
import NavbarCom from './Navbar/NavbarCom.js'
import DashBoard from './Dashboard/Dashboard.js'
import Logout from './Logout/Logout.js'
import Users from './Users/users.js'
import AssignmentsList from './assignmentsList/assignmentsList.js'
import AssignmentsQues from './AssignmentsQues/AssignmentsQues.js'
import Colleges from './Colleges/Colleges.js'
import CollegeName from './Colleges/CollegeName.js'
import UsersEdit from './Dashboard/UsersEdit/UsersEdit'
import Footer  from './Footer/Footer'
import './App.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
            <NavbarCom token={window.localStorage.getItem("JWT")}/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/dashboard" render={(props) => <DashBoard {...props} isAuthed={true} token={window.localStorage.getItem("JWT")} />}/>
            <Route path="/dashboard/:id" render={(props) => <DashBoard {...props} isAuthed={true} token={window.localStorage.getItem("JWT")} />}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/test"   render={(props) => <Test {...props}  token={window.localStorage.getItem("JWT")}/>}/>
            <Route path="/logout" component={Logout}/>
            <Route exact path="/users" render={(props) => <Users {...props}  token={window.localStorage.getItem("JWT")}/>}/>
            <Route path="/users/:username" render={(props) => <UsersEdit {...props}  token={window.localStorage.getItem("JWT")}/>}/>
            <Route exact path="/assignments" render={(props) => <AssignmentsList {...props}  token={window.localStorage.getItem("JWT")}/>}/>
            <Route path="/assignments/:id" render={(props) => <AssignmentsQues {...props}  token={window.localStorage.getItem("JWT")}/>}/>
            <Route exact path="/colleges" component={Colleges}/>
            <Route exact path="/colleges/:id" component={CollegeName}/>
            <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

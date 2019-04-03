import React, { Component } from 'react';
import {  Button, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios'
import urls from '../backendurls.js'
import './Login.css'
class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            incorrect:false
        }
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    setUsername(e){
        this.setState({
            incorrect:false,
            username:e.target.value
        })
    }
    setPassword(e){
        this.setState({
            incorrect:false,
            password:e.target.value
        })
    }
    submitLogin(){
            axios.post(urls.apiauth, {
                email:this.state.username,
                password:this.state.password
            })
            .then((response)=>{
                window.localStorage.setItem("JWT",response.data.token)
                window.location="/dashboard"
            })
            .catch((error)=> {
                this.setState({
                    incorrect:true,
                    username:'',
                    password:''

                })
            });
    }
    render(){
        return(
            <div className="full">
                <div className="main-div"> 
                        <div id="logotext"> 
                        < img src = "https://via.placeholder.com/75" id="imgid"/>
                        <h3 >CodeHub Login</h3>
                        </div>
                        {this.state.incorrect&&<p className="incorrect"> *username or password is incorrect</p>}
                        <FormGroup>
                            <Label for="Email">Email</Label>
                            <Input type="email" name="email" id="Email" placeholder="Enter email" onChange={this.setUsername} value={this.state.username}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Password">Password</Label>
                            <Input type="password" name="password" id="Password" placeholder="Enter password" onChange={this.setPassword} value={this.state.password} />
                        </FormGroup>

                        <Button color="primary" onClick={this.submitLogin}>Submit</Button>
                    
                </div>
            </div>
        )
    }
}

export default Login;
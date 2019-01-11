import React, { Component } from 'react';
import { Button, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios'
import './SignUp.css'
import urls from './backendurls.js'
class SignUp extends Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            name:'',
            email:'',
            password:''
        }
        this.setUsername = this.setUsername.bind(this)
        this.setname = this.setname.bind(this)
        this.setemail = this.setemail.bind(this)
        this.setdob = this.setdob.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.submitDetails = this.submitDetails.bind(this)
    }
    setUsername(e){
        this.setState({
            username:e.target.value,
        })
    }
    setname(e) {
        this.setState({
            name: e.target.value,
        })
    }
    setemail(e) {
        this.setState({
            email: e.target.value,
        })
    }
    setPassword(e) {
        this.setState({
            password: e.target.value,
        })
    }
    setdob(e) {
        this.setState({
            dob: e.target.value,
        })
    }
    submitDetails(){
        axios.post(urls.apisignup, {
                date_of_birth:this.state.dob,
                email: this.state.email,
                password: this.state.password,
                name:this.state.name,
                username:this.state.username
            })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render(){
        return(
            <div className="main">
                <div className="responsivePair">
                    <div className="imgContainer">
                        <img className="imageC" alt="marketingImage" src="https://cdn.pixabay.com/photo/2017/07/31/11/31/laptop-2557468_1280.jpg"/>
                    </div>
                    <div className="fieldContainer">
                         <h3>SignUp</h3>
                         <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" id="username" placeholder="Enter username" onChange={this.setUsername} value={this.state.username}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Enter name" onChange={this.setname} value={this.state.name}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Date of Birth</Label>
                            <Input type="date" name="dob" id="dob" placeholder="Enter dob" onChange={this.setdob} value={this.state.dob}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Email">Email</Label>
                            <Input type="email" name="email" id="Email" placeholder="Enter email" onChange={this.setemail} value={this.state.email}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Password">Password</Label>
                            <Input type="password" name="password" id="Password" placeholder="Enter password" onChange={this.setPassword} value={this.state.password} />
                        </FormGroup>

                        <Button color="primary" onClick={this.submitDetails}>Start Coding Now</Button>
                    </div>
                </div>
                </div>
        )
    }
}

export default SignUp;
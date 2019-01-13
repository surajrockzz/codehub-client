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
        this.setValues = this.setValues.bind(this)
        this.submitDetails = this.submitDetails.bind(this)
    }

    setValues(e){
        if(e.target.id==="username"){
            this.setState({
                username: e.target.value
            })
        }
        else if (e.target.id === "email"){
            this.setState({
                email: e.target.value
            })
        }
        else if (e.target.id === "name"){
            this.setState({
                name: e.target.value
            })
        }
        else if (e.target.id === "dob"){
            this.setState({
                dob: e.target.value
            })
        }
        else if(e.target.id === "Password"){
            this.setState({
                password: e.target.value
            });
        }
    }
    
    submitDetails(){
        console.log(this.state)
        axios.post(urls.apiusers, {
                date_of_birth:this.state.dob,
                email: this.state.email,
                password: this.state.password,
                name:this.state.name,
                username:this.state.username
            })
            .then(function (response) {
                console.log(response)
                if(response.status ===201){
                    window.location='/login'
                }
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
                        <img className="imageC" alt="marketingImage" src="https://https://cdn.pixabay.com/photo/2018/02/27/17/40/programming-3186084_1280.png.pixabay.com/photo/2017/07/31/11/31/laptop-2557468_1280.jpg"/>
                    </div>
                    <div className="fieldContainer">
                         <h3>SignUp</h3>
                         <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" id="username" placeholder="Enter username" onChange={this.setValues} value={this.state.username}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Enter name" onChange={this.setValues} value={this.state.name}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Date of Birth</Label>
                            <Input type="date" name="dob" id="dob" placeholder="Enter dob" onChange={this.setValues} value={this.state.dob}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Enter email" onChange={this.setValues} value={this.state.email}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Password">Password</Label>
                            <Input type="password" name="password" id="Password" placeholder="Enter password" onChange={this.setValues} value={this.state.password} />
                        </FormGroup>

                        <Button color="primary" onClick={this.submitDetails}>Start Coding Now</Button>
                    </div>
                </div>
                </div>
        )
    }
}

export default SignUp;
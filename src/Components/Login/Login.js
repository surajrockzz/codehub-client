import React, { Component } from 'react';
import { Container, Row, Col, Button, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios'
import urls from '../backendurls.js'
import './Login.css'
class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:''
        }
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    setUsername(e){
        this.setState({
            username:e.target.value
        })
    }
    setPassword(e){
        this.setState({
            password:e.target.value
        })
    }
    submitLogin(){
            axios.post(urls.apiauth, {
                email:this.state.username,
                password:this.state.password
            })
            .then(function (response) {
                window.localStorage.setItem("JWT",response.data.token)
                alert("token-submitted")
                window.location="/dashboard"
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render(){
        return(
            <Container className="full">
                <Row className="main-div">
                    
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <h3>Login</h3>
                        <FormGroup>
                            <Label for="Email">Email</Label>
                            <Input type="email" name="email" id="Email" placeholder="Enter email" onChange={this.setUsername} value={this.state.username}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Password">Password</Label>
                            <Input type="password" name="password" id="Password" placeholder="Enter password" onChange={this.setPassword} value={this.state.password} />
                        </FormGroup>

                        <Button color="primary" onClick={this.submitLogin}>Submit</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Login;
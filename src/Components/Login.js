import React, { Component } from 'react';
import { Container, Row, Col, Button, FormGroup, Label, Input} from 'reactstrap';
import './Login.css'
class Login extends Component{
    render(){
        return(
            <Container className="full">
                <Row className="main-div">
                    
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <h3>Login</h3>
                        <FormGroup>
                            <Label for="Email">Email</Label>
                            <Input type="email" name="email" id="Email" placeholder="Enter email" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Password">Password</Label>
                            <Input type="password" name="password" id="Password" placeholder="Enter password" />
                        </FormGroup>

                        <Button color="primary">Submit</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Login;
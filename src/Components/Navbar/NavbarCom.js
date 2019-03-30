import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

  class NavbarCom extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      token:this.props.token
    };
    this.updateTokenInf = this.updateTokenInf.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  updateTokenInf(){
    this.setState({
      token:null
    })
  }
  render() {
    if(this.state.token==null){
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">CodeHub</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signup">SignUp</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
    }
    else{
      return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">CodeHub</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/dashboard">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/assignments">assignments</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/colleges">colleges</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/users">users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/logout">Log out</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
    }
  }
}


export default NavbarCom; 
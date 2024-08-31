import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from './CurrentUserContext';
import axios from 'axios';
import logo from '../assets/logo.png';


const LoggedOutIcons = () => (
  <>
    <NavLink to="/signup">Sign Up</NavLink>
    <NavLink to="/signin">Sign In</NavLink>
  </>
);

const AddLocation = () => (
  <NavLink to="/newlocation">Add Location</NavLink>
);



const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null)
    } catch (err) {
      console.log(err)
    }
  }

  const LoggedInIcons = () => (
    <>
      {currentUser?.username}
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/" onClick={handleSignOut}>Log Out</NavLink>
    </>
  );

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            {currentUser && <AddLocation />}
          </Nav>
          <Nav className="ms-auto">
            {currentUser ? <LoggedInIcons /> : <LoggedOutIcons />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

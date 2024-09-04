import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { axiosReq } from "../api/axiosDefaults";
import { useNavigate } from 'react-router-dom';

import { useCurrentUser, useSetCurrentUser } from './CurrentUserContext';
import logo from '../assets/logo.png';
import showAlert from '../components/Sweetalert';


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
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      await axiosReq.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      navigate('/');
      showAlert('Logged Out', 'You have succesfully logged out', 'success')
    } catch (err) {
      showAlert('Logged Out', 'There waas an issue when logging out please try again', 'error')
    }
  };

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

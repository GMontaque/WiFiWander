import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { axiosReq } from "../api/axiosDefaults";
import { useNavigate } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from './CurrentUserContext';
import logo from '../assets/logo.png';
import showAlert from '../components/Sweetalert';
import Swal from 'sweetalert2';

const LoggedOutIcons = () => (
  <>
    <NavLink to="/signup" className="remove-underline nav-color">Sign Up</NavLink>
    <NavLink to="/signin" className="remove-underline ms-4 nav-color">Sign In</NavLink>
  </>
);

const AddLocation = () => (
  <NavLink to="/newlocation" className="remove-underline ms-4 nav-color">Add Location</NavLink>
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
      showAlert('Logged Out', 'You have successfully logged out', 'success');
    } catch (err) {
      showAlert('Error', 'There was an issue logging out, please try again', 'error');
    }
  };

  const confirmSignOut = () => {
    // SweetAlert confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to sign out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, sign out!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        handleSignOut();
      }
    });
  };

  const LoggedInIcons = () => (
    <>
      <p className='white capitalize'>{currentUser?.username}</p>
      <NavLink to="/profile" className="ms-4 remove-underline nav-color">Profile</NavLink>
      <NavLink to="/" onClick={confirmSignOut} className="ms-4 remove-underline nav-color">Log Out</NavLink>
    </>
  );

  return (
    <Navbar expand="lg" className=" title">
      <Container className='navStyle'>
        <NavLink to="/">
          <Navbar.Brand className='logo'>
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
          <Nav className="me-auto navbar-mobile-links">
            <NavLink to="/" className="remove-underline nav-color">Home</NavLink>
            <NavLink to="/about" className="remove-underline ms-4 nav-color">About Us</NavLink>
            {currentUser && <AddLocation />}
          </Nav>
          <Nav className="ms-auto navbar-mobile-login">
            {currentUser ? <LoggedInIcons /> : <LoggedOutIcons />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

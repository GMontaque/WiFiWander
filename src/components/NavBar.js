import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { axiosReq } from "../api/axiosDefaults";
import { useNavigate } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from './CurrentUserContext';
import logo from '../assets/logo.png';
import showAlert from '../components/Sweetalert';
import Swal from 'sweetalert2';

const LoggedOutIcons = ({ closeNav }) => (
  <>
    <NavLink to="/signup" onClick={closeNav} className={({ isActive }) => isActive ? "remove-underline nav-color active" : "remove-underline nav-color"}>Sign Up</NavLink>
    <NavLink to="/signin" onClick={closeNav} className={({ isActive }) => isActive ? "remove-underline ms-4 nav-color active" : "remove-underline ms-4 nav-color"}>Sign In</NavLink>
  </>
);

const AddLocation = ({ closeNav }) => (
  <NavLink to="/newlocation" onClick={closeNav} className={({ isActive }) => isActive ? "remove-underline ms-4 nav-color active" : "remove-underline ms-4 nav-color"}>Add Location</NavLink>
);

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

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

  const closeNav = () => setExpanded(false);

  const LoggedInIcons = ({ closeNav }) => (
    <>
      <p className='white capitalize'>{currentUser?.username}</p>
      <NavLink to="/profile" onClick={closeNav} className={({ isActive }) => isActive ? "ms-4 remove-underline nav-color active" : "ms-4 remove-underline nav-color"}>Profile</NavLink>
      <span
        onClick={() => { closeNav(); confirmSignOut(); }}
        className="ms-4 remove-underline nav-color logout-btn"
        role="button"
      >
        Log Out
      </span>
    </>
  );

  return (
    <Navbar expand="lg" expanded={expanded} onToggle={setExpanded} className="title">
      <Container className='navStyle'>
        <NavLink to="/" onClick={closeNav}>
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navbar-mobile-links">
            <NavLink to="/" onClick={closeNav} className={({ isActive }) => isActive ? "remove-underline nav-color active" : "remove-underline nav-color"}>Home</NavLink>
            <NavLink to="/about" onClick={closeNav} className={({ isActive }) => isActive ? "remove-underline ms-4 nav-color active" : "remove-underline ms-4 nav-color"}>About Us</NavLink>
            {currentUser && <AddLocation closeNav={closeNav} />}
          </Nav>
          <Nav className="ms-auto navbar-mobile-login">
            {currentUser ? <LoggedInIcons closeNav={closeNav} /> : <LoggedOutIcons closeNav={closeNav} />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

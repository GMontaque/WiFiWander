import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <Container fluid>
            <Row>
                <footer>
                    <Row>
                        <Col className='text-align-c' sm={3}>
                            <Link to="/">
                                <img
                                    src={logo}
                                    className="d-inline-block align-top"
                                    alt="Logo"
                                />
                            </Link>
                        </Col>
                        <Col className='text-align-c pt-5' sm={6}>
                            <Link to="/" className='white remove-underline footer-link'>Home</Link>
                            <Link to="/about" className='white remove-underline ms-5 footer-link'>About Us</Link>
                        </Col>
                        <Col className='text-align-c pt-5' sm={3}>
                            <a className='' href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-x-twitter"></i>
                            </a>
                            <a className='ms-4 ' href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-square-facebook"></i>
                            </a>
                            <a className='ms-4' href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-square-instagram"></i>
                            </a>
                        </Col>
                    </Row>
                    <Row className='footer-bottom'>
                        <p className='white'>&copy; {new Date().getFullYear()} Wifi Wander. All rights reserved.</p>
                        <p className='white'>
                            This website and its content are the property of Wifi Wander. Unauthorized
                            reproduction, distribution, or use of the content is strictly prohibited
                            without prior consent from the company.
                        </p>
                    </Row>
                </footer>
            </Row>
        </Container>
    );
}

export default Footer;

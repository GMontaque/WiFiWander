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
                        <Col>
                            <Link to="/">
                                <img
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="Logo"
                                />
                            </Link>
                        </Col>
                        <Col>
                            <Link to="/">Home</Link>
                            <Link to="/about">About Us</Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-x-twitter"></i>
                            </a>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-square-facebook"></i>
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-square-instagram"></i>
                            </a>
                        </Col>
                    </Row>
                    <Row>
                        <p>&copy; {new Date().getFullYear()} Wifi Wander. All rights reserved.</p>
                        <p>
                            This website and its content are the property of Wifi Wander. Unauthorized
                            reproduction, distribution, or use of the content is strictly prohibited
                            without prior consent from the company.
                        </p>
                        <p>
                            Wifi Wander is committed to protecting your privacy and personal data.
                            For more information, please review our Privacy Policy
                            and Terms of Service.
                        </p>
                    </Row>
                </footer>
            </Row>
        </Container>
    );
}

export default Footer;

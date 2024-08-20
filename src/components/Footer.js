import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
    return (
        <Container fluid>
            <Row>
                <footer>
                    <Row>
                        <Col>company name and logo</Col>
                        <Col>nav bar links</Col>
                    </Row>
                    <Row>
                        <Col>social meida links</Col>
                        <Col>company rights info</Col>
                    </Row>
                </footer>
            </Row>
        </Container>
    )
}

export default Footer
import React from 'react'
import { Container, Image, Row } from 'react-bootstrap'
import teamImg from '../assets/team.jpg'

const NotFound = () => {
  return (
    <Container>
      <Row className='justify-content-center margin-bottom-7'>
        <h1 className='pageTitle mt-5 mb-5'>Error 404, page not found</h1>
        <Image src={teamImg} className='img-fluid mt-5 mb-5' />
      </Row>
    </Container>
  )
}

export default NotFound
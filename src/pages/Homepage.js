import React from 'react'
import Continents from '../pages/Continents';
import { Row } from 'react-bootstrap';


const Homepage = () => {
  return (
    <>
      <Row>
        <h1>Homepage</h1>
      </Row>
      <Row>
        <Continents />
      </Row>
    </>
  )
}

export default Homepage


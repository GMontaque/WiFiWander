import React from 'react'
import TotalLocations from '../components/TotalLocations';
import SearchBar from '../components/SearchBar';
import Continents from '../pages/Continents';
import { Row } from 'react-bootstrap';


const Homepage = () => {
  return (
    <>
      <Row>
        <h1>Homepage</h1>
        <TotalLocations />
        <SearchBar />
      </Row>
      <Row>
        <Continents />
      </Row>
    </>
  )
}

export default Homepage


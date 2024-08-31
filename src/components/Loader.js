import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner animation="border" role="status" style={{ width: '10rem', height: '10rem', borderWidth: '2rem' }}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default Loader
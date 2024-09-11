import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div className='loaderStyle'>
      <Spinner animation="border" role="status" className='spin-icon'>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader
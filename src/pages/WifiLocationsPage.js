import React from 'react'
import { Image, Row } from 'react-bootstrap'
import Comments from '../components/Comments'
import AmenitiesKey from '../components/AmenitiesKey'

const WifiLocationsPage = () => {
    return (
        <>
            <Row>
                <h1>Wifi Location title</h1>
                <div>star rating</div>
                <Image src='' alt='image of wifi location' />
                <p>Wifi description</p>
                <div>Amenities icons</div>
            </Row>
            <Row>
                <Comments/>
            </Row>
            <AmenitiesKey/>
        </>
    )
}

export default WifiLocationsPage
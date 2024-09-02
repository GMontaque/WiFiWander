import React from 'react';
import { Image, Row, Button } from 'react-bootstrap';
import AmenitiesKey from '../components/AmenitiesKey';
import { useCurrentUser } from '../components/CurrentUserContext';


const WifiLocationsPage = () => {
  const wifiLocation = {
    name: "test",
    star_rating: 2,
    image: null,
    description: "afrsadfsdfs",
    amenities: "wifi"
  }
  const currentUser = useCurrentUser();


  return (
    <>
      <Row>
        <h1>{wifiLocation.name}</h1>
        <span>
          {currentUser && (
            <Button >Add to Favorites</Button>
          )}
        </span>
        <div>{wifiLocation.star_rating || 'No rating available'}</div>
        {wifiLocation.image && (
          <Image
            src={wifiLocation.image}
            alt={`Image of ${wifiLocation.name}`}
            fluid
          />
        )}
        <p>{wifiLocation.description}</p>
        <div>{wifiLocation.amenities}</div>
      </Row>
      <AmenitiesKey />
    </>
  );
};

export default WifiLocationsPage;

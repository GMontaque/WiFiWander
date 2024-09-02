import React, { useEffect, useState } from 'react';
import { axiosReq } from "../api/axiosDefaults";
import { Image, Row, Button } from 'react-bootstrap';
import AmenitiesKey from '../components/AmenitiesKey';
import { useCurrentUser } from '../components/CurrentUserContext';

import { useParams } from 'react-router-dom';

const WifiLocationsPage = () => {
  const { id } = useParams();
  const [wifiLocation, setWifiLocation] = useState(null);
  const [error, setError] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchWifiLocation = async () => {
      try {
        const response = await axiosReq.get(
          `/wifi_locations/${id}`
        );
        setWifiLocation(response.data);
      } catch (err) {
        setError('Failed to fetch WiFi location data');
        console.error(err);
      }

    };

    fetchWifiLocation();
  }, [id]);


  console.log(error);
  return (
    <>
      <Row>
        <h1>{wifiLocation.name}</h1>
        <span>
          {currentUser && (
            <Button>Add to Favorites</Button>
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
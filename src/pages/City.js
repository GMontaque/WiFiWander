import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Col, Card, Button } from 'react-bootstrap';
import showAlert from '../components/Sweetalert';

const City = () => {
  const { continentName, countryName } = useParams();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`/wifi_locations/?continent=${continentName}&country=${countryName}`);
        const uniqueCities = [...new Set(response.data.map(location => location.city))];
        setCities(uniqueCities);
      } catch (error) {
        showAlert('error','Error fetching cities, please refresh and try again', 'error');
      }
    };

    fetchCities();
  }, [continentName, countryName]);

  return (
    <div>
      <h2>Select a City in {countryName}</h2>
      <ul>
      {cities.map(city => (
          <Col key={city} sm={12} md={6} lg={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{city}</Card.Title>
                <Button variant="primary">
                  <Link to={`/continents/${continentName}/${countryName.toLowerCase()}/${city.toLowerCase()}`} style={{ color: 'white', textDecoration: 'none' }}>
                    Explore {city}
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </ul>
    </div>
  );
};

export default City;

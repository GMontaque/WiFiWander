import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Col, Card, Button } from 'react-bootstrap';
import showAlert from '../components/Sweetalert';

const Country = () => {
  const { continentName } = useParams();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`/wifi_locations/?continent=${continentName}`);
        const uniqueCountries = [...new Set(response.data.map(location => location.country))];
        setCountries(uniqueCountries);
      } catch (error) {
        showAlert('error','Error fetching countries, please refresh and try again', 'error');
      }
    };

    fetchCountries();
  }, [continentName]);

  return (
    <div>
      <h2>Select a Country in {continentName}</h2>
      <ul>
        {countries.map(country => (
            <Col key={country} sm={12} md={6} lg={4}>
                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title>{country}</Card.Title>
                        <Button variant="primary">
                        <Link to={`/continents/${continentName}/${country.toLowerCase()}`} style={{ color: 'white', textDecoration: 'none' }}>
                            Explore {country}
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

export default Country;

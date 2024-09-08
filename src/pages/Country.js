import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Col, Card } from 'react-bootstrap';
import showAlert from '../components/Sweetalert';
import BreadcrumbComp from '../components/BreadcrumbComp';

const Country = () => {
  const { continentName, countryName } = useParams();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`/wifi_locations/?continent=${continentName}`);
        const uniqueCountries = [...new Set(response.data.map(location => location.country))];
        setCountries(uniqueCountries);
      } catch (error) {
        showAlert('error', 'Error fetching countries, please refresh and try again', 'error');
      }
    };

    fetchCountries();
  }, [continentName]);

  return (
    <div>
      <div>
        <BreadcrumbComp continentName={continentName} countryName={countryName} />
      </div>
      <h1 className='pageTitle'>Select a Country in {continentName.charAt(0).toUpperCase() + continentName.slice(1)}</h1>
      <div className='list'>
        {countries.map(country => (
          <Col key={country} sm={12} md={6} lg={4}>
            <Card className="mb-4">
              <Card.Body className='citybtn'>
                <Card.Title>{country}</Card.Title>
                <div className="btn-back">
                  <Link to={`/continents/${continentName}/${country.toLowerCase()}`} className="btn">
                    Explore {country}
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>
    </div>
  );
};

export default Country;

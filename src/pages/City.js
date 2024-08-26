import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import BreadcrumbComp from '../components/BreadcrumbComp';

const citiesData = {
  Egypt: ['Cairo', 'Alexandria', 'Giza'],
  Japan: ['Tokyo', 'Osaka', 'Kyoto'],
  Germany: ['Berlin', 'Munich', 'Frankfurt'],
  Canada: ['Toronto', 'Vancouver', 'Montreal'],
  Colombia: ['Bogotá', 'Medellín', 'Cali'],
  Fiji: ['Suva', 'Nadi', 'Lautoka']
};

const City = () => {
  const { continentName, countryName } = useParams();

  if (!continentName || !countryName) {
    console.error("continentName or countryName is undefined");
    return <Navigate to="/404" />;
  }

  const cities = citiesData[countryName.charAt(0).toUpperCase() + countryName.slice(1)];

  if (!cities) {
    return <Navigate to="/404" />;
  }

  return (
    <div>
      <BreadcrumbComp continentName={continentName} countryName={countryName} />
      <h2>Cities in {countryName.charAt(0).toUpperCase() + countryName.slice(1)}</h2>
      <Row>
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

        <Card.Body>
          <Card.Title>No Results</Card.Title>
          <Card.Text>
            Could find a the country you were looking for? why not create a new entry
          </Card.Text>
          <Button variant="primary">
            <Link to={"/newlocation"} style={{ color: 'white', textDecoration: 'none' }}>
              Add Location
            </Link>
          </Button>
        </Card.Body>

      </Row>
    </div>
  );
};

export default City;

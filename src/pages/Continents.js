import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import heroImage from '../assets/3949076.jpg';

const continents = [
  { name: 'Africa', path: '/continents/africa' },
  { name: 'Asia', path: '/continents/asia' },
  { name: 'Europe', path: '/continents/europe' },
  { name: 'North America', path: '/continents/north_america' },
  { name: 'South America', path: '/continents/south_america' },
  { name: 'Australia', path: '/continents/australia' },
];

const Continents = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {continents.map((continent) => (
        <Card key={continent.name} className="mb-4" style={{ width: '30rem' }}>
          <Card.Img variant="top" src={heroImage} />
          <Card.Body>
            <Card.Title>{continent.name}</Card.Title>
            <Card.Text>
              Discover Wi-Fi locations in {continent.name}.
            </Card.Text>
            <Button variant="primary">
              <Link to={continent.path} style={{ color: 'white', textDecoration: 'none' }}>
                Explore {continent.name}
              </Link>
            </Button>
          </Card.Body>
        </Card>
      ))}

    </div>
  );
}

export default Continents;

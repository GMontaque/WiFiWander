import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import africaImage from '../assets/africa.png';
import asiaImage from '../assets/asia.png';
import europeImage from '../assets/europe.png';
import northAmericaImage from '../assets/north_america.png';
import southAmericaImage from '../assets/south_america.png';
import australiaImage from '../assets/oceania.png';

const continents = [
  { name: 'Africa', path: '/continents/africa', image: africaImage },
  { name: 'Asia', path: '/continents/asia', image: asiaImage },
  { name: 'Europe', path: '/continents/europe', image: europeImage },
  { name: 'North America', path: '/continents/north_america', image: northAmericaImage },
  { name: 'South America', path: '/continents/south_america', image: southAmericaImage },
  { name: 'Australia', path: '/continents/australia', image: australiaImage },
];

const Continents = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {continents.map((continent) => (
        <Card key={continent.name} className="mb-4" style={{ width: '30rem' }}>
          <Card.Img variant="top" src={continent.image} />
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

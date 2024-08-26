import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import BreadcrumbComp from '../components/BreadcrumbComp';

const countryData = {
    africa: ['Egypt', 'South Africa', 'Morocco', 'Nigeria', 'Algeria'],
    asia: ['China', 'Japan', 'India', 'South Korea', 'Indonesia'],
    europe: ['Germany', 'France', 'United Kingdom', 'Italy', 'Spain'],
    north_america: ['United States', 'Canada', 'Mexico', 'Guatemala', 'Cuba'],
    south_america: ['Brazil', 'Argentina', 'Colombia', 'Peru', 'Chile'],
    australia: ['Australia', 'New Zealand', 'Papua New Guinea', 'Fiji', 'Solomon Islands']
};

const Country = () => {
    const { continentName, countryName } = useParams();

    if (!continentName) {
        console.error("continentName is undefined");
        return <Navigate to="/404" />;
    }

    const countries = countryData[continentName.toLowerCase()];

    if (!countries) {
        return <Navigate to="/404" />;
    }

    if (countryName && !countries.includes(countryName.charAt(0).toUpperCase() + countryName.slice(1))) {
        return <Navigate to="/404" />;
    }

    return (
        <div>
            <BreadcrumbComp continentName={continentName} countryName={countryName} />
            <h2>Countries in {continentName.charAt(0).toUpperCase() + continentName.slice(1)}</h2>
            <Row>
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

export default Country;

import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BreadcrumbComp = ({ continentName, countryName, cityName }) => {
    return (
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
            {continentName && (
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/continents/${continentName}` }}>
                    {continentName.charAt(0).toUpperCase() + continentName.slice(1)}
                </Breadcrumb.Item>
            )}
            {countryName && (
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/continents/${continentName}/${countryName.toLowerCase()}` }}>
                    {countryName.charAt(0).toUpperCase() + countryName.slice(1)}
                </Breadcrumb.Item>
            )}
            {cityName && (
                <Breadcrumb.Item active>
                    {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    );
};

export default BreadcrumbComp;

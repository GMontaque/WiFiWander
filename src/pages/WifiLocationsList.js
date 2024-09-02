import React, { useEffect, useState } from 'react';
import { axiosReq } from "../api/axiosDefaults";
import Table from 'react-bootstrap/Table';
import { useParams, NavLink } from 'react-router-dom';
import BreadcrumbComp from '../components/BreadcrumbComp';

const WifiLocationsList = () => {
    const { continentName, countryName, cityName } = useParams();

    // store fetched WiFi locations
    const [wifiLocations, setWifiLocations] = useState([]);
    const [error, setError] = useState(null); // State to handle any errors

    const table_names = [
        "Image", "Name", "Street", "City", "Country", "Postcode", "Amenities", "Page link"
    ];

    // WiFi locations API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosReq.get('/wifi_locations/');
                // console.log(response.data);
                setWifiLocations(response.data);
            } catch (err) {
                setError('Failed to fetch WiFi locations');
                console.error(err);
            }
        };

        fetchData();

    }, []);

    return (
        <>
            <div>
                <BreadcrumbComp continentName={continentName} countryName={countryName} cityName={cityName} />
            </div>
            <h1>{cityName}</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Table responsive>
                <thead>
                    <tr>
                        {table_names.map((name, index) => (
                            <th key={index}>{name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* fetches WiFi location data */}
                    {wifiLocations.map((location, index) => (
                        <tr key={index}>
                            <td>
                                {location.image ? (
                                    <img src={location.image} alt={location.name} style={{ width: '100px' }} />
                                ) : (
                                    'No Image'
                                )}
                            </td>
                            <td>{location.name}</td>
                            <td>{location.street}</td>
                            <td>{location.city}</td>
                            <td>{location.country}</td>
                            <td>{location.postcode}</td>
                            <td>{location.amenities}</td>
                            <td>
                                {/* NavLink to individual wifi location */}
                                <NavLink to={`/wifi-locations/${location.id}`}>View Details</NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default WifiLocationsList;

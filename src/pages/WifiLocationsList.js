import React, { useEffect, useState } from 'react';
import { axiosReq } from "../api/axiosDefaults";
import Table from 'react-bootstrap/Table';
import { useParams, NavLink } from 'react-router-dom';
import BreadcrumbComp from '../components/BreadcrumbComp';
import showAlert from '../components/Sweetalert';

const WifiLocationsList = () => {
  const { continentName, countryName, cityName } = useParams();
  const [wifiLocations, setWifiLocations] = useState([]);
  const [error, setError] = useState(null);

  const table_names = [
    "Image", "Name", "Street", "City", "Country", "Postcode", "Amenities", "Page link"
  ];

  // Fetch WiFi locations based on continent, country, and city
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosReq.get(`/wifi_locations/?continent=${continentName}&country=${countryName}&city=${cityName}`);
        setWifiLocations(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch WiFi locations');
      }
    };

    fetchData();
  }, [continentName, countryName, cityName]);

  useEffect(() => {
    if (error) {
      showAlert('error', error, 'error');
    }
  }, [error]);

  return (
    <>
      {/* Display Breadcrumb */}
      <div>
        <BreadcrumbComp continentName={continentName} countryName={countryName} cityName={cityName} />
      </div>

      {/* Display the city name */}
      <h1>{cityName}</h1>

      {/* display WiFi locations */}
      <Table responsive>
        <thead>
          <tr>
            {table_names.map((name, index) => (
              <th key={index}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {wifiLocations && wifiLocations.length > 0 ? (
            wifiLocations.map((location) => (
              <tr key={location.id}>
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
                  {/* NavLink to individual WiFi location page */}
                  <NavLink to={`/wifi-locations/${location.id}`}>View Details</NavLink>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={table_names.length}>No WiFi locations found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default WifiLocationsList;

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
      <h1 className='pageTitle'>{cityName.charAt(0).toUpperCase() + cityName.slice(1)}</h1>

      {/* display WiFi locations */}
      {wifiLocations.length > 0 ? (
        <Table responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              {/* Conditionally render address fields only if they have data */}
              {wifiLocations.some(location => location.street) && <th className="d-none-712">Street</th>}
              {wifiLocations.some(location => location.city) && <th className="d-none-712 ">City</th>}
              {wifiLocations.some(location => location.country) && <th className="d-none-712 ">Country</th>}
              {wifiLocations.some(location => location.postcode) && <th className="d-none-712 ">Postcode</th>}
              <th>Amenities</th>
              <th className="d-none-712">Page link</th>
            </tr>
          </thead>
          <tbody>
            {wifiLocations.map((location) => (
              <React.Fragment key={location.id}>
                <tr>
                  <td>
                    {location.image ? (
                      <img src={location.image} alt={location.name} style={{ width: '100px' }} />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>{location.name}</td>
                  {location.street && <td className="d-none-712">{location.street}</td>}
                  {location.city && <td className="d-none-712">{location.city}</td>}
                  {location.country && <td className="d-none-712">{location.country}</td>}
                  {location.postcode && <td className="d-none-712">{location.postcode}</td>}
                  <td>{location.amenities}</td>
                  <td className="d-none-712">
                    <NavLink to={`/wifi-locations/${location.id}`}>View Details</NavLink>
                  </td>
                </tr>
                {/* mobile wifi location link */}
                <tr className="d-none display">
                  <td colSpan="6">
                    <NavLink to={`/wifi-locations/${location.id}`}>View Details</NavLink>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No WiFi locations found.</p>
      )}
    </>
  );
};

export default WifiLocationsList;

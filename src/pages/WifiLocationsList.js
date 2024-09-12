import React, { useEffect, useState } from 'react';
import { axiosReq } from "../api/axiosDefaults";
import Table from 'react-bootstrap/Table';
import { useParams, NavLink } from 'react-router-dom';
import BreadcrumbComp from '../components/BreadcrumbComp';
import showAlert from '../components/Sweetalert';
import Loader from '../components/Loader';

const WifiLocationsList = () => {
  const { continentName, countryName, cityName } = useParams();
  const [wifiLocations, setWifiLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch WiFi locations based on continent, country, and city
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosReq.get(`/wifi_locations/?continent=${continentName}&country=${countryName}&city=${cityName}`);
        setWifiLocations(response.data);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError('Failed to fetch WiFi locations');
        setLoading(false);
      }
    };

    fetchData();
  }, [continentName, countryName, cityName]);

  useEffect(() => {
    if (error) {
      showAlert('error', error, 'error');
    }
  }, [error]);

  // If still loading, show the loader
  if (loading) {
    return <Loader />;
  }

  if (!loading && wifiLocations.length === 0) {
    return <p>No WiFi locations found.</p>;
  }

  return (
    <>
      {/* Display Breadcrumb */}
      <div>
        <BreadcrumbComp continentName={continentName} countryName={countryName} cityName={cityName} />
      </div>

      {/* Display the city name */}
      <h1 className='pageTitle'>{cityName.charAt(0).toUpperCase() + cityName.slice(1)}</h1>

      {/* Display WiFi locations */}
      <Table responsive>
        <thead>
          <tr className='white'>
            <th>Image</th>
            <th>Name</th>
            {wifiLocations.some(location => location.street) && <th className="d-none-831">Street</th>}
            {wifiLocations.some(location => location.city) && <th className="d-none-631">City</th>}
            {wifiLocations.some(location => location.country) && <th className="d-none-526">Country</th>}
            {wifiLocations.some(location => location.postcode) && <th className="d-none-831">Postcode</th>}
            <th className='d-none-520 d-none-446'>Amenities</th>
            <th className="d-none-831">Link</th>
          </tr>
        </thead>
        <tbody>
          {wifiLocations.map((location) => (
            <React.Fragment key={location.id}>
              <tr className='white'>
                <td>
                  {location.image ? (
                    <img src={location.image} alt={location.name} className='p-4 list-img' />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className='table-pad'>{location.name}</td>
                {location.street && <td className="d-none-831 table-pad">{location.street}</td>}
                {location.city && <td className="table-pad d-none-631">{location.city}</td>}
                {location.country && <td className="table-pad d-none-526">{location.country}</td>}
                {location.postcode && <td className="d-none-831 table-pad">{location.postcode}</td>}
                <td className='table-pad d-none-520 d-none-446'>{location.amenities}</td>
                <td className="d-none-831 table-pad">
                  <NavLink className='remove-underline white wifiListHover' to={`/wifi-locations/${location.id}`}>View</NavLink>
                </td>
              </tr>
              {/* Mobile wifi location link */}
              <tr className="d-none display">
                <td colSpan="6">
                  <p className='d-none mobile-amenities '>Amenities: {location.amenities}</p>
                  <NavLink to={`/wifi-locations/${location.id}`} className='remove-underline white wifiListHover'>View</NavLink>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default WifiLocationsList;

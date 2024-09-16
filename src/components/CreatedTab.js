import React, { useEffect, useState } from 'react';
import { axiosReq } from "../api/axiosDefaults";
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';
import Loader from '../components/Loader';

const CreatedTab = ({ username }) => {
  const [wifiLocations, setWifiLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const table_names = [
    { label: "Image", key: null },
    { label: "Name", key: "name" },
    { label: "City", key: "city" },
    { label: "Country", key: "country" },
    { label: "Page link", key: null },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosReq.get('/wifi_locations/');
        const userLocations = response.data.filter(location => location.added_by === username);
        setWifiLocations(userLocations);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch WiFi locations: Please refresh and try again');
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  // If loading, show the loader
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Table responsive>
        <thead>
          <tr>
            {table_names.map((col, index) => (
              <th key={index} id={col.key || undefined}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {wifiLocations.map((location, index) => (
            <tr key={index}>
              <td className='fav-table'>
                {location.image ? <img src={location.image} alt={location.name} className='fav-img' /> : 'No Image'}
              </td>
              <td>{location.name}</td>
              <td id="city">{location.city}</td>
              <td id="country">{location.country}</td>
              <td>
                <NavLink className="remove-underline white created" to={`/wifi-locations/${location.id}`}>View Page</NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default CreatedTab;

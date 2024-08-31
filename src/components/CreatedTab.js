import React, { useEffect, useState, useMemo } from 'react';
import { axiosReq } from "../api/axiosDefaults";
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';

const CreatedTab = ({ username }) => {
  // State to store fetched WiFi locations and errors
  const [wifiLocations, setWifiLocations] = useState([]);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  const table_names = [
    { label: "Image", key: null },
    { label: "Name", key: "name" },
    { label: "City", key: "city" },
    { label: "Country", key: "country" },
    { label: "Page link", key: null },
  ];

  // Fetch WiFi locations from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosReq.get('/wifi_locations/');
        // Filter locations to only include those created by the logged-in user
        const userLocations = response.data.filter(location => location.added_by === username);
        setWifiLocations(userLocations);
      } catch (err) {
        setError('Failed to fetch WiFi locations');
        console.error(err);
      }
    };

    fetchData();
  }, [username]);

  // Sorting function
  const requestSort = (key) => {
    if (!key) return;
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // sort data
  const sortedData = useMemo(() => {
    let sortableItems = [...wifiLocations];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [wifiLocations, sortConfig]);

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Table responsive>
        <thead>
          <tr>
            {table_names.map((col, index) => (
              <th key={index}>
                {col.key ? (
                  <button
                    type="button"
                    onClick={() => requestSort(col.key)}
                    className="btn btn-link p-0"
                  >
                    {col.label}
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render sorted WiFi location data */}
          {sortedData.map((location, index) => (
            <tr key={index}>
              <td>
                {location.image ? (
                  <img src={location.image} alt={location.name} style={{ width: '100px' }} />
                ) : (
                  'No Image'
                )}
              </td>
              <td>{location.name}</td>
              <td>{location.city}</td>
              <td>{location.country}</td>
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

export default CreatedTab;

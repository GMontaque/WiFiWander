import React, { useEffect, useState } from "react";
import { Table, Alert, Button } from 'react-bootstrap';
import { useCurrentUser } from '../components/CurrentUserContext';
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useNavigate } from 'react-router-dom';

const FavouritesTab = () => {
  const currentUser = useCurrentUser();
  const [favorites, setFavorites] = useState([]);
  const [wifiLocations, setWifiLocations] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!currentUser) {
          setError('User is not authenticated.');
          return;
        }

        const response = await axiosReq.get('/favourites/');
        setFavorites(response.data);

        const wifiLocationIds = response.data
          .map(fav => fav.wifi_location_id_display)
          .filter(id => id !== undefined && id !== null);

        if (wifiLocationIds.length === 0) {
          console.error('No valid WiFi locations found in favorites:', response.data);
          setError('No valid WiFi locations found in favorites.');
          return;
        }

        const wifiLocationPromises = wifiLocationIds.map(id =>
          axiosReq.get(`/wifi_locations/${id}/`)
        );
        const wifiLocationResponses = await Promise.all(wifiLocationPromises);

        const wifiLocationData = {};
        wifiLocationResponses.forEach(res => {
          wifiLocationData[res.data.id] = res.data;
        });

        setWifiLocations(wifiLocationData);
      } catch (err) {
        setError('Failed to fetch favorites or WiFi locations');
        console.error('Error fetching favorites or WiFi locations:', err);
      }
    };

    if (currentUser) {
      fetchFavorites();
    }
  }, [currentUser]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h4>Your Favorites</h4>
      {favorites.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Notes</th>
              <th>Visit Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((fav) => {
              const wifiLocation = wifiLocations[fav.wifi_location_id_display];
              return (
                <tr key={fav.id}>
                  <td>
                    {wifiLocation && wifiLocation.image ? (
                      <img src={wifiLocation.image} alt={wifiLocation.name} width="50" />
                    ) : (
                      'No image available'
                    )}
                  </td>
                  <td>{wifiLocation ? wifiLocation.name : 'Loading...'}</td>
                  <td>{fav.notes}</td>
                  <td>{fav.visit_status}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p>No favorites available.</p>
      )}
    </div>
  );
};

export default FavouritesTab;

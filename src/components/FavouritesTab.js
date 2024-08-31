import React, { useEffect, useState } from "react";
import { Table, Alert } from 'react-bootstrap';
import { useCurrentUser } from '../components/CurrentUserContext';
import { axiosReq } from "../api/axiosDefaults";

const FavouritesTab = () => {
  const currentUser = useCurrentUser();
  const [favorites, setFavorites] = useState([]);
  const [wifiLocations, setWifiLocations] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Fetch the user's favorites
        const response = await axiosReq.get(`/favourites/?user=${currentUser.id}`);
        setFavorites(response.data);

        // get wifi location ID from the favorites
        const wifiLocationIds = response.data.map(fav => fav.wifi_location);

        // Fetch details for each wifi location
        const wifiLocationPromises = wifiLocationIds.map(id =>
          axiosReq.get(`/wifi_locations/${id}`)
        );
        const wifiLocationResponses = await Promise.all(wifiLocationPromises);

        const wifiLocationData = {};
        wifiLocationResponses.forEach(res => {
          wifiLocationData[res.data.id] = res.data;
        });

        setWifiLocations(wifiLocationData);
        console.log(wifiLocationData);
      } catch (err) {
        setError('Failed to fetch favorites or WiFi locations');
        console.error(err);
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
            </tr>
          </thead>
          <tbody>
            {favorites.map((fav, index) => {
              const wifiLocation = wifiLocations[fav.wifi_location];
              return (
                <tr key={index}>
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

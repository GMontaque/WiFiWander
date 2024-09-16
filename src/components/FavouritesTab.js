import React, { useEffect, useState } from "react";
import { Table, Button } from 'react-bootstrap';
import { useCurrentUser } from '../components/CurrentUserContext';
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useNavigate } from 'react-router-dom';
import showAlert from '../components/Sweetalert';
import Swal from 'sweetalert2';
import Loader from '../components/Loader';

const FavouritesTab = () => {
  const currentUser = useCurrentUser();
  const [favorites, setFavorites] = useState([]);
  const [wifiLocations, setWifiLocations] = useState({});
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch favorites or WiFi locations');
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchFavorites();
    }
  }, [currentUser]);

  // Function to handle removing a favorite
  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await axiosRes.delete(`/favourites/${favoriteId}/`);
      // Update the favorites list after deletion
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== favoriteId));
      showAlert('success', 'WiFi location removed from favorites', 'success');
    } catch (err) {
      showAlert('error', 'Failed to remove WiFi location from favorites, please refresh and try again', 'error');
    }
  };

  const deleteFavorite = (commentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this from Favorites?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        handleRemoveFavorite(commentId);
      }
    });
  };

  const handleViewLocation = (locationId) => {
    navigate(`/wifi-locations/${locationId}/`);
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h4 className='d-none'>Your Favorites</h4>
      {favorites.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th className="d-none-426">Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((fav) => {
              const wifiLocation = wifiLocations[fav.wifi_location_id_display];
              return (
                <tr key={fav.id}>
                  <td className="fav-table">
                    {wifiLocation && wifiLocation.image ? (
                      <img src={wifiLocation.image} alt={wifiLocation.name} className="fav-img" />
                    ) : (
                      'No image available'
                    )}
                  </td>
                  <td className="white">{wifiLocation ? wifiLocation.name : <Loader />}</td>
                  <td className="d-none-426 white">{fav.visit_status}</td>
                  <td>
                    <Button
                      variant=""
                      onClick={() => handleViewLocation(fav.wifi_location_id_display)}
                      className="me-2 btn created"
                    >
                      View Page
                    </Button>
                    <Button
                      className="btn created" variant=""
                      onClick={() => deleteFavorite(fav.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p className="white p-4 fav-back">No favorites added</p>
      )}
    </div>
  );
};

export default FavouritesTab;

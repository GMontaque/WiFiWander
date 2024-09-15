import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import showAlert from './Sweetalert';

const WifiLocationActions = ({ isCreator, isAdmin, wifiLocation, currentUser, handleUpdateLocation, handleDeleteLocation }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    const checkIfFavorited = async () => {
      try {
        if (!currentUser) return;

        // Fetch favorites from the API
        const favResponse = await axiosReq.get('/favourites/');
        const wifiLocationIds = favResponse.data
          .map(fav => fav.wifi_location_id_display)
          .filter(id => id !== undefined && id !== null);

        if (wifiLocationIds.length > 0) {
          const wifiLocationPromises = wifiLocationIds.map(id =>
            axiosReq.get(`/wifi_locations/${id}/`)
          );
          const wifiLocationResponses = await Promise.all(wifiLocationPromises);

          const wifiLocationNames = wifiLocationResponses.map(res => res.data.name);
          const isInFavorites = wifiLocationNames.includes(wifiLocation?.name);

          setIsFavorited(isInFavorites);
          setDisableButton(false);
        } else {
          setDisableButton(false);
        }
      } catch (err) {
        console.error('Failed to fetch favorites', err);
        setDisableButton(false);
      }
    };

    checkIfFavorited();
  }, [currentUser, wifiLocation?.name]);

  const handleAddToFavorites = async () => {
    if (!currentUser) {
      showAlert('error', 'You must be logged in to add to favorites', 'error');
      return;
    }

    try {
      const response = await axiosReq.post(`/favourites/`, {
        wifi_location_id: wifiLocation.id,
        notes: '',
        folder_name: '',
        visit_status: 'Planned',
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (response.status === 201) {
        showAlert('success', 'Location added to favorites successfully!', 'success');
        setIsFavorited(true);
      }
    } catch (err) {
      showAlert('error', 'Failed to add location to favorites', 'error');
      console.error(err);
    }
  };

  return (
    <div className='wifi-links'>
      {(!isCreator || isAdmin) && (
        <div className="btn-back m-top-1">
          <Button
            onClick={!isFavorited ? handleAddToFavorites : null}
            className="btn"
            variant=""
            disabled={isFavorited || disableButton}
          >
            {isFavorited ? 'Already in Favorites' : 'Add to Favorites'}
          </Button>
        </div>
      )}

      {(isCreator || isAdmin) && (
        <>
          <div className="btn-back m-top-1 ms-2">
            <Button onClick={handleUpdateLocation} className="btn" variant="">
              Edit Location
            </Button>
          </div>

          <div className="btn-back m-top-1 ms-2">
            <Button onClick={handleDeleteLocation} className="btn" variant="">
              Delete Location
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default WifiLocationActions;

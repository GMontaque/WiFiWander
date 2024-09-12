import React from 'react';
import { Button } from 'react-bootstrap';

const WifiLocationActions = ({ isCreator, isAdmin, handleAddToFavorites, handleUpdateLocation, handleDeleteLocation }) => {
  return (
    <div className='wifi-links'>
      {(!isCreator || isAdmin) && (
        <div className="btn-back m-top-1">
          <Button onClick={handleAddToFavorites} className="btn" variant="">
            Add to Favorites
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
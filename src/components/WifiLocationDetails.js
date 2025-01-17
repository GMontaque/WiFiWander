import React from 'react';
import { Image } from 'react-bootstrap';

const WifiLocationDetails = ({ wifiLocation, matchedAmenities }) => {
  return (
    <div className='wifi-mobile'>
      <div className='w-100'>
        {wifiLocation.image && (
          <Image
            src={wifiLocation.image}
            alt={`Image of ${wifiLocation.name}`}
            fluid
          />
        )}
        <h5 className='mt-3 mb-3'>Amenities</h5>
        <div className="amenities">
          {matchedAmenities.length > 0 ? (
            matchedAmenities.map((amenity, index) => (
              <div key={index} className="amenity-item">
                <i className={`fa-solid ${amenity.icon} fa-2x`}></i>
                <p>{amenity.name}</p>
              </div>
            ))
          ) : (
            <p className='no-amenities'>No amenities available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WifiLocationDetails;
import React from 'react';

const StarRating = ({ rating }) => {
    const validRating = isNaN(rating) ? 0 : parseFloat(rating);

    const fullStars = Math.floor(validRating);
    const halfStar = validRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<i key={`full-${i}`} className="fa-solid fa-star" ></i>);
    }

    if (halfStar) {
        stars.push(<i key="half" className="fa-solid fa-star-half-stroke" ></i>);
    }

    // Push empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<i key={`empty-${i}`} className="fa-regular fa-star"></i>);
    }

    return <div className='mt-3 mb-3'>{stars}</div>;
};

export default StarRating;

import React from 'react';
import { Image } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import heroImageHome from '../assets/headerImage.webp';


function Hero() {
    const location = useLocation();

    const HeroImage = () => {
        if (location.pathname === '/') {
            // return heroImageHome
            return <Image src={heroImageHome} className="img-fluid" alt="top" style={{ width: '100%', height: '50rem' }} />
        } else {
            // return heroImageHome
            return <Image src={heroImageHome} className="img-fluid" alt="top" style={{ width: '100%', height: '20rem' }} />
        }
    };

    return (
        <>
            {HeroImage()}
        </>
    );
}

export default Hero;

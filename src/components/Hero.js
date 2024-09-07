import React from 'react';
import { useLocation } from 'react-router-dom';

function Hero() {
    const location = useLocation();

    const HeroImage = () => {
        if (location.pathname === '/') {
            return (
                <div className="hero-container">
                    <div className="overlay">
                        <h1 className="overlay-title title">Wifi Wander</h1>
                        <p className="overlay-text white">Find, share, and rate Wi-Fi spots across the globe. Join our community today.</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="hero-container" style={{ width: '100%', height: '30rem', 'background-position': 'center -21rem' }}>
                    <div className="overlay"></div>
                </div>
            );
        }
    };

    return <>{HeroImage()}</>;
}

export default Hero;

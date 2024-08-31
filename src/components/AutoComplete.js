import React, { useState } from 'react';
import worldCities from '../Json/worldcities.json';

const AutoComplete = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);

    const handleChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.length > 0) {
            const results = worldCities.filter((city) =>
                city.city.toLowerCase().includes(term.toLowerCase()) ||
                city.country.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredCities(results);
        } else {
            setFilteredCities([]);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search for a city or country..."
            />
            {filteredCities.length > 0 && (
                <ul>
                    {filteredCities.map((city, index) => (
                        <li key={index}>
                            {city.city}, {city.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoComplete;

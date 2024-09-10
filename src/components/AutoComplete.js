import React, { useState } from 'react';
import worldCities from '../Json/worldcities.json';

const AutoComplete = ({ type, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);

    const handleChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.length > 0) {
            const results = worldCities.filter((city) =>
                type === 'city'
                    ? city.city.toLowerCase().includes(term.toLowerCase())
                    : city.country.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredCities(results);
        } else {
            setFilteredCities([]);
        }
    };

    const handleSelect = (city) => {
        if (type === 'city') {
            onSelect(city.city, city.country);
            setSearchTerm(city.city);
        } else {
            onSelect(city.country);
            setSearchTerm(city.country);
        }
        setFilteredCities([]);
    };

    return (
        <div>
            <input
                className='width-100'
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder={type === 'city' ? 'Search for a city...' : 'Search for a country...'}
            />
            {filteredCities.length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0, maxHeight: '150px', overflowY: 'auto', border: '1px solid #ddd' }}>
                    {filteredCities.map((city, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(city)}
                            style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #ddd' }}
                        >
                            {type === 'city' ? `${city.city}, ${city.country}` : city.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoComplete;

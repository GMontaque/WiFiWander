import React, { useState, useEffect, useMemo } from 'react';
import worldCities from '../Json/worldcities.json';

const AutoComplete = ({ type, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Memoize the filtering operation
    const results = useMemo(() => {
        if (debouncedSearchTerm.length > 0) {
            const lowerCaseTerm = debouncedSearchTerm.toLowerCase();
            const filtered = worldCities.filter((city) =>
                type === 'city'
                    ? city.city.toLowerCase().includes(lowerCaseTerm)
                    : city.country.toLowerCase().includes(lowerCaseTerm)
            ).slice(0, 10);

            setNoResults(filtered.length === 0);
            return filtered;
        }
        return [];
    }, [debouncedSearchTerm, type]);

    // Update the filteredCities state whenever the results change
    useEffect(() => {
        setFilteredCities(results);
    }, [results]);

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

    const handleKeyDown = (event, city) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleSelect(city);
        }
    };

    return (
        <div>
            {noResults && searchTerm.length > 0 && (
                <p className='auto-complete-error'>No results found</p>
            )}

            <input
                className='width-100'
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={type === 'city' ? 'Search for a city...' : 'Search for a country...'}
            />

            {filteredCities.length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0, maxHeight: '150px', overflowY: 'auto', border: '1px solid #ddd' }}>
                    {filteredCities.map((city, index) => (
                        <li key={index} style={{ padding: '5px', borderBottom: '1px solid #ddd' }}>
                            <button
                                onClick={() => handleSelect(city)}
                                onKeyDown={(event) => handleKeyDown(event, city)}
                                style={{ cursor: 'pointer', background: 'none', border: 'none', textAlign: 'left', width: '100%' }}
                            >
                                {type === 'city' ? `${city.city}, ${city.country}` : city.country}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoComplete;

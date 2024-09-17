import React, { useState, useEffect, useMemo } from 'react';
import worldCities from '../Json/worldcities.json';

const AutoComplete = ({ type, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    // Debounce the search term to optimize filtering performance
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300); // Wait 300ms after the user stops typing
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Memoize the filtering operation for performance improvement
    const results = useMemo(() => {
        if (debouncedSearchTerm.length > 0) {
            const lowerCaseTerm = debouncedSearchTerm.toLowerCase();
            return worldCities.filter((city) =>
                type === 'city'
                    ? city.city.toLowerCase().includes(lowerCaseTerm)
                    : city.country.toLowerCase().includes(lowerCaseTerm)
            ).slice(0, 10); // Limit the results to 10
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

import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <div>
            <Form className="d-flex" onSubmit={handleSearch}>
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={query}
                    onChange={handleInputChange}
                />
                <Button variant="outline-success" type="submit">Search</Button>
            </Form>
        </div>
    );
}

export default SearchBar;

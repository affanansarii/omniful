import React, { useEffect, useState } from 'react';

const fetchResult = (query) => {

    return new Promise((res) => {
        setTimeout(() => {
            const results = ['Apple', 'Apricot', 'Application', 'Banana', 'Cherry'];
            res(results.filter(item => item.toLowerCase().includes(query.toLowerCase())));
        }, 1000);
    })

}

const debounce = (func, delay) => {

    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    }

}

const SearchComponent = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = debounce(async (searchQuery) => {
        if (searchQuery) {
            const searchResults = await fetchResult(searchQuery);
            setResults(searchResults);
        } else {
            setResults([]);
        }
    }, 500);

    useEffect(() => {
        handleSearch(query);
    }, [query]);

    return (

        <div>

            <input type='text' placeholder='Search...' value={query} onChange={(e) => setQuery(e.target.value)} />

            <ul>
                {results.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

        </div>

    )

}

export default SearchComponent;
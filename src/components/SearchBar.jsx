import React, { useState } from 'react';

function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                props.setSearchResults(data.meals);
            })
            .catch(error => console.error(error));
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <form onSubmit={handleSearch} className="input-group mb-3">
            <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search for recipes" className="form-control" />
            <div className="input-group-append">
            <button type="submit" className="btn btn-primary">Search</button>
            </div>
        </form>
    );
}

export default SearchBar;

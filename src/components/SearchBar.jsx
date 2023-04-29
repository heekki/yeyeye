import React, { useState } from 'react';
import { searchRecipe } from '../api';

function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        searchRecipe(searchTerm, props.setSearchResults);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <form onSubmit={handleSearch} className="input-group mb-3">
            <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search for recipes from TheMealDB" className="form-control" style={{'borderRadius':'8px 0 0 8px'}} />
            <div className="input-group-append">
            <button type="submit" className="btn btn-outline-light">Search</button>
            </div>
        </form>
    );
}

export default SearchBar;

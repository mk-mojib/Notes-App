/* Search.js */

import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import "./Search.css"

const Search = ({ handleSearchNote }) => {
  const handleChange = (event) => {
    if (typeof handleSearchNote === 'function') {
      handleSearchNote(event.target.value);
    } else {
      console.error('handleSearchNote is not a function');
    }
  };

  return (
    <div className='search'>
      <MdSearch className='search-icons' size='1.3em' />
      <input
        onChange={handleChange}
        type='text'
        placeholder='Type to search...'
        aria-label='Search notes'
      />
    </div>
  );
};

Search.propTypes = {
  handleSearchNote: PropTypes.func.isRequired,
};

export default Search;

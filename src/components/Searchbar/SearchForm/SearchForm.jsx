import React, { useState } from 'react'
import PropTypes from 'prop-types'
import s from './SearchForm.module.css'

function SearchForm ({onSubmit}) {

  const [imageCategory, setImageCategory] = useState('');

  const handleNameImage = e => {
    setImageCategory(e.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(imageCategory);
    setImageCategory('');
  };

    return (
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          onChange={handleNameImage}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    )
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default SearchForm

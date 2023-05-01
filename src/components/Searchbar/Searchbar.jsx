import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ReactComponent as IconInput } from '../../Icon/searchIcon.svg';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleQueryChange = evt => {
    setQuery(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (query.trim() === '') {
      Notify.warning('Enter your request');
      return;
    }

    onSubmit(query);
  };
  return (
    <>
      <header className={css.searchbar}>
        <form onSubmit={handleSubmit} className={css.searchForm}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
            <IconInput width="25px" height="25px" />
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleQueryChange}
          />
        </form>
      </header>
    </>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

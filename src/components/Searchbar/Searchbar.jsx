import React from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ReactComponent as IconInput } from '../../Icon/searchIcon.svg';

export class Searchbar extends React.Component {
  state = {
    query: '',
    page: 1,
  };

  handleQueryChange = evt => {
    this.setState({ query: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.query.trim() === '') {
      Notify.warning('Enter your request');
      return;
    }

    this.props.onSubmit(this.state.query);
  };
  render() {
    return (
      <>
        <header className={css.searchbar}>
          <form onSubmit={this.handleSubmit} className={css.searchForm}>
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
              value={this.state.query}
              onChange={this.handleQueryChange}
            />
          </form>
        </header>
      </>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

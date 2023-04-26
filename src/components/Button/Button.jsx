import PropTypes from 'prop-types';
import css from './Button.module.css';

export function Button({ loadMore }) {
  return (
    <button className={css.button} onClick={loadMore} type="button">
      Load more
    </button>
  );
}
Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

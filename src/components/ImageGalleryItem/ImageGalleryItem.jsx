import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends React.Component {
  state = { isOpenModal: false };
  toggleModal = () => {
    this.setState(prevState => ({ isOpenModal: !prevState.isOpenModal }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    const { isOpenModal } = this.state;
    return (
      <li className={css.imageGalleryItem}>
        <img
          className={css.imageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={this.toggleModal}
        />
        {isOpenModal && (
          <Modal
            closeModal={this.toggleModal}
            largeModalImageURL={largeImageURL}
            tags={tags}
          />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

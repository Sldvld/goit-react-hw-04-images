import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ webformatURL, tags, largeImageURL }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModal = () => {
    setIsOpenModal(prevState => !prevState);
  };

  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={toggleModal}
      />
      {isOpenModal && (
        <Modal
          closeModal={toggleModal}
          largeModalImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

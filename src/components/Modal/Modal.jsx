import css from './Modal.module.css';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ closeModal, largeModalImageURL, tags }) {
  useEffect(() => {
    const closeOnEsc = evt => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeOnEsc);

    return () => {
      window.removeEventListener('keydown', closeOnEsc);
    };
  }, [closeModal]);

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      closeModal();
    }
  };
  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={largeModalImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeModalImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

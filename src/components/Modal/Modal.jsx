import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom';
import s from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root');

function Modal ({onClose, largeImageURL}) {

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    const overlay = document.querySelector('#overlay');
    overlay.addEventListener('click', handleBackdropClick);
  },);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
      window.removeEventListener('keydown', handleKeyDown);
    }
  };

  const handleBackdropClick = event => {

    if (event.currentTarget === event.target) {
      onClose();
      const overlay = document.querySelector('#overlay');
      overlay.removeEventListener('click', handleBackdropClick);
    }
  };

    return createPortal(
      <div id='overlay' className={s.Overlay}>
        <div className={s.Modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot,
    );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
}

export default Modal

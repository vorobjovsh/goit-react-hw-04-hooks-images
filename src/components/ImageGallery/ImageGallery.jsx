import React, {  } from 'react'
import PropTypes from 'prop-types'
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css'

function ImageGallery ({images, clickImg}) {

    return (
      images.length > 0 &&
      <ul className={s.ImageGallery}>
          {images.map(({ id, webformatURL, largeImageURL }) => (
             <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} clickImg={clickImg} />
          ))}
      </ul>
    )
}

ImageGallery.propTypes = {
  clickImg: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired
      }),
    ),
}

export default ImageGallery

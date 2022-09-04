import React, {useState, useEffect } from 'react';
import './App.css'
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import btnImagesApi from 'services/btnImagesApi';
import { ThreeCircles } from  'react-loader-spinner'

export const App = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bigImage, setBigImage] = useState('');
  const [countPage, setCountPage] = useState(1);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = searchName => {

    setName(searchName);
    setCountPage(1);
    setImages([]);
    setIsLoading(true);

  };

  useEffect(() => {
    if (name === '') {
      return;
    }

    if (countPage === 1) {
      btnImagesApi
      .fetchImagesAddBtn(name, countPage.toString())
      .then(response => {
        setImages(response.data.hits);
        setIsLoading(false);
      });
    }
  },[name, countPage]);

  const toggleModal = () => {
    setShowModal(!showModal);
    if (bigImage) {
      setBigImage('');
    }
  };

  const largeImage = bImg => {
    toggleModal();
    setBigImage(bImg);
  };

  const addImages = () => {

    setCountPage(prevState => (prevState + 1));

    setIsLoading(true);

  };

  useEffect(() => {

    if (countPage === 1) {
      return;
    }

    btnImagesApi
      .fetchImagesAddBtn(name, countPage.toString())
      .then(response => {
          //let dataImages = images
          const data = response.data.hits;
          data.map((elem) => (images.push(elem)))
          setImages(images);
          setIsLoading(false);
      })
  },[countPage, name, images]);

  return (
    <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery images={images} clickImg={largeImage} />
        {isLoading &&
        <ThreeCircles
          height="100"
          width="100"
          color="#3f51b5"
          wrapperStyle={{}}
          wrapperClass="spoon"
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
        }
        {images.length > 0 && (
          <Button addPictures={addImages} />
        )}
        {showModal && (
          <Modal onClose={toggleModal} largeImageURL={bigImage} />
        )}
      </div>
  );
};

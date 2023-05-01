import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { FetchImages } from '../Api/FetchImages';
import { Button } from './Button/Button';
import { Loader } from '../Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from '../components/App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    setLoading(true);
    const fetchData = async () => {
      const { totalHits, hits } = await FetchImages(query, page);
      if (totalHits === 0) {
        Notify.failure('Nothing was found for your request');
        setLoading(false);
        return;
      }
      setImages(prevState => (page === 1 ? hits : [...prevState, ...hits]));
      setTotalHits(prevState =>
        page === 1 ? totalHits - hits.length : prevState - hits.length
      );
      setLoading(false);
    };
    fetchData().catch(error => {
      Notify.failure('Something went wrong');
      setLoading(false);
    });
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setTotalHits(0);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      {images && <ImageGallery images={images} />}
      {!loading && images.length > 0 && totalHits > images.length && (
        <Button loadMore={handleLoadMore} />
      )}
      {loading && <Loader />}
    </div>
  );
};
//не відображає живу сторінку...

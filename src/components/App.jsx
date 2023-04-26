import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { FetchImages } from '../Api/FetchImages';
import { Button } from './Button/Button';
import { Loader } from '../Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from '../components/App.module.css';

export class App extends React.Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalHits: 0,
    loading: false,
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loading: true });
        const { totalHits, hits } = await FetchImages(
          this.state.query,
          this.state.page
        );
        if (totalHits === 0) {
          Notify.failure('Nothing was found for your request');
          this.setState({ loading: false });
          return;
        }
        this.setState(prevState => ({
          images: this.state.page === 1 ? hits : [...prevState.images, ...hits],
          totalHits:
            this.state.page === 1
              ? totalHits - hits.length
              : totalHits - [...prevState.images, ...hits].length,
        }));
        this.setState({ loading: false });
      } catch (error) {
        Notify.failure('Something went wrong');
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleFormSubmit = query => {
    this.setState({ query, page: 1 });
  };

  render() {
    const { images, totalHits, loading } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images && <ImageGallery images={images} />}
        {!loading && images.length > 0 && totalHits > images.length && (
          <Button loadMore={this.handleLoadMore} />
        )}
        {loading && <Loader />}
      </div>
    );
  }
}

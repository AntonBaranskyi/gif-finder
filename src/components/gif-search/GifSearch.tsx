import React, { useState } from 'react';
import { useGifSearchPaginated } from '../../shared/hooks/use-giph-search';
import styles from './GifSearch.module.scss';
import { useDebouncedSearchGif } from '../../hooks/use-debounced-search-gif';
import { usePopupToggle } from '../../shared/hooks/use-popup-toggle';
import { GifModal } from '../gif-modal/GifModal';
import type { GiphyGif } from '../../types/giphy.types';
import Error from '../error/error';
import GifCard from '../gif-card/gif-card';

export function GifSearch() {
  const {
    search,
    submittedSearch,
    handleSearch,
    handleSubmit,
    setSubmittedSearch,
  } = useDebouncedSearchGif();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    status,
  } = useGifSearchPaginated(submittedSearch);
  const { isOpen, handleOpen, handleClose } = usePopupToggle();
  const [selectedGif, setSelectedGif] = useState<GiphyGif | null>(null);

  const handleLoadMore = () => {
    fetchNextPage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim()) {
      e.preventDefault();
      setSubmittedSearch(search.trim());
    }
  };

  const handleGifClick = (gif: GiphyGif) => {
    setSelectedGif(gif);
    handleOpen();
  };

  const handleModalClose = () => {
    handleClose();
    setSelectedGif(null);
  };

  const allGifs = data?.pages?.flatMap((page) => page.data) || [];
  const error = status === 'error';

  return (
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <h1 className={styles.title}>GIF Finder</h1>
        <p className={styles.subtitle}>Search for the perfect GIF</p>

        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <div className={styles.inputWrapper}>
            <input
              type='text'
              value={search}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              placeholder='Search for GIFs...'
              className={styles.searchInput}
              disabled={isLoading}
            />
            <button
              type='submit'
              className={styles.searchButton}
              disabled={isLoading || !search.trim()}
            >
              {isLoading ? (
                <span className={styles.loadingSpinner}>⟳</span>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>
      </div>

      {error && <Error />}

      {isLoading && !isFetchingNextPage && (
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}>⟳</div>
          <p>Searching for GIFs...</p>
        </div>
      )}

      {allGifs.length > 0 && (
        <div className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2>Found {allGifs.length} GIFs</h2>
          </div>

          <div className={styles.gifGrid}>
            {allGifs.map((gif) => (
              <GifCard key={gif.id} gif={gif} handleGifClick={handleGifClick} />
            ))}
          </div>

          {hasNextPage && (
            <div className={styles.loadMoreSection}>
              <button
                onClick={handleLoadMore}
                className={styles.loadMoreButton}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                  <>
                    <span className={styles.loadingSpinner}>⟳</span>
                    Loading more...
                  </>
                ) : (
                  'Load More GIFs'
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {!isLoading &&
        !error &&
        allGifs.length === 0 &&
        submittedSearch.trim() && (
          <div className={styles.noResults}>
            <p>No GIFs found for "{submittedSearch}"</p>
            <p>Try a different search term</p>
          </div>
        )}

      {!isLoading &&
        !error &&
        allGifs.length === 0 &&
        !submittedSearch.trim() && (
          <div className={styles.initialState}>
            <p>Enter a search term to find GIFs</p>
          </div>
        )}

      <GifModal isOpen={isOpen} onClose={handleModalClose} gif={selectedGif} />
    </div>
  );
}

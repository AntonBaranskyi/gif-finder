import type { GiphyGif } from '../../types/giphy.types';
import styles from '../gif-search/GifSearch.module.scss';

type GifCardProps = {
  gif: GiphyGif;
  handleGifClick: (gif: GiphyGif) => void;
};

const GifCard = ({ gif, handleGifClick }: GifCardProps) => {
  return (
    <div className={styles.gifCard} onClick={() => handleGifClick(gif)}>
      <div className={styles.gifImageWrapper}>
        <img
          src={gif.images.fixed_height.url}
          alt={gif.title}
          className={styles.gifImage}
          loading='lazy'
        />
        <div className={styles.gifOverlay}>
          <button
            className={styles.copyButton}
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(gif.images.original.url);
            }}
            title='Copy GIF URL'
          >
            📋
          </button>
        </div>
      </div>
      <div className={styles.gifInfo}>
        <h3 className={styles.gifTitle}>{gif.title}</h3>
      </div>
    </div>
  );
};

export default GifCard;

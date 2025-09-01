import styles from './error.module.scss';

const Error = () => {
  return (
    <div className={styles.error}>
      <p>Failed to load GIFs. Please try again.</p>
      <button
        onClick={() => window.location.reload()}
        className={styles.retryButton}
      >
        Try Again
      </button>
    </div>
  );
};

export default Error;

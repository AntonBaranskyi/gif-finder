import { useState } from 'react'
import styles from './GifModal.module.scss'
import type { GiphyGif } from '../../types/giphy.types'
import { useDownloadFromUrl } from '../../shared/hooks/use-download-from-url'
import { formatDate } from '../../shared/utils/format-date.util'

interface GifModalProps {
  isOpen: boolean
  onClose: () => void
  gif: GiphyGif | null
}

export function GifModal({ isOpen, onClose, gif }: GifModalProps) {
  const { downloadFromUrl } = useDownloadFromUrl()
  const [isCopied, setIsCopied] = useState(false)
  
  if (!isOpen || !gif) return null

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(gif.images.original.url)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

 
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        
        <div className={styles.modalContent}>
          <div className={styles.gifPreview}>
            <img 
              src={gif.images.original.url} 
              alt={gif.title}
              className={styles.gifImage}
            />
          </div>
          
          <div className={styles.gifInfo}>
            <h2 className={styles.gifTitle}>{gif.title}</h2>
            
            <div className={styles.gifMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Rating:</span>
                <span className={styles.metaValue}>{gif.rating.toUpperCase()}</span>
              </div>
              
              {gif.username && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Author:</span>
                  <span className={styles.metaValue}>{gif.username}</span>
                </div>
              )}
              
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Import date:</span>
                <span className={styles.metaValue}>{formatDate(gif.import_datetime)}</span>
              </div>
              
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Size:</span>
                <span className={styles.metaValue}>
                  {gif.images.original.width} × {gif.images.original.height}
                </span>
              </div>
            </div>
            
            <div className={styles.actions}>
              <button 
                className={`${styles.actionButton} ${isCopied ? styles.copySuccess : ''}`}
                onClick={handleCopyLink}
              >
                {isCopied ? '✅ Copied!' : '📋 Copy link'}
              </button>
              
              <button 
                className={styles.actionButton}
                onClick={() => downloadFromUrl(gif.images.original.url, `${gif.title || 'gif'}.gif`)}
              >
                💾 Download GIF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

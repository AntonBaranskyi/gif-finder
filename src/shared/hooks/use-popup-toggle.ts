import { useState, useCallback } from 'react'

export function usePopupToggle() {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    handleOpen,
    handleClose
  }
}
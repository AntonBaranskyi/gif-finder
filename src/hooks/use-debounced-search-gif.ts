import { useState, useCallback } from 'react'

export function useDebouncedSearchGif() {
  const [search, setSearch] = useState('')
  const [submittedSearch, setSubmittedSearch] = useState('')

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setSubmittedSearch(search.trim())
  }, [search])

  return {
    search,
    submittedSearch,
    handleSearch,
    handleSubmit,
    setSubmittedSearch
  }
}
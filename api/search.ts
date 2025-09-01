import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Search API handler called:', {
    method: req.method,
    url: req.url,
    query: req.query
  })

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  res.setHeader('Access-Control-Max-Age', '86400')

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request')
    res.status(200).end()
    return
  }

  try {
    const { q, offset = '0', limit = '10', rating = 'g' } = req.query
    const apiKey = process.env.VITE_GIPHY_API_KEY
    
    console.log('Processing search request:', { q, offset, limit, rating, hasApiKey: !!apiKey })
    
    if (!apiKey) {
      console.error('Giphy API key not configured')
      return res.status(500).json({ error: 'Giphy API key not configured' })
    }

    if (!q || typeof q !== 'string') {
      console.error('Query parameter "q" is required')
      return res.status(400).json({ error: 'Query parameter "q" is required' })
    }

    // Construct the Giphy API URL
    const giphyUrl = 'https://api.giphy.com/v1/gifs/search'
    const url = new URL(giphyUrl)
    
    // Add all parameters
    url.searchParams.set('api_key', apiKey)
    url.searchParams.set('q', q)
    url.searchParams.set('offset', offset.toString())
    url.searchParams.set('limit', limit.toString())
    url.searchParams.set('rating', rating.toString())

    console.log('Making request to Giphy:', url.toString())

    // Make request to Giphy API
    const response = await fetch(url.toString())
    const data = await response.json()

    console.log('Giphy response status:', response.status)

    if (!response.ok) {
      console.error('Giphy API error:', data)
      return res.status(response.status).json(data)
    }

    console.log('Successfully proxied Giphy search response')
    res.status(200).json(data)
  } catch (error) {
    console.error('Search API error:', error)
    res.status(500).json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' })
  }
}

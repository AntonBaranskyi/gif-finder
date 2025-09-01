export default async function handler(req, res) {
  console.log('Simple API handler called:', {
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
    const { q = 'cat', limit = '5' } = req.query
    const apiKey = process.env.VITE_GIPHY_API_KEY
    
    console.log('Processing simple request:', { q, limit, hasApiKey: !!apiKey })
    
    if (!apiKey) {
      console.error('Giphy API key not configured')
      return res.status(500).json({ error: 'Giphy API key not configured' })
    }

    // Construct the Giphy API URL
    const giphyUrl = 'https://api.giphy.com/v1/gifs/search'
    const url = new URL(giphyUrl)
    
    // Add parameters
    url.searchParams.set('api_key', apiKey)
    url.searchParams.set('q', q)
    url.searchParams.set('limit', limit)
    url.searchParams.set('rating', 'g')

    console.log('Making request to Giphy:', url.toString())

    // Make request to Giphy API
    const response = await fetch(url.toString())
    const data = await response.json()

    console.log('Giphy response status:', response.status)

    if (!response.ok) {
      console.error('Giphy API error:', data)
      return res.status(response.status).json(data)
    }

    console.log('Successfully proxied Giphy response')
    res.status(200).json(data)
  } catch (error) {
    console.error('Simple API error:', error)
    res.status(500).json({ error: 'Internal server error', details: error.message })
  }
}

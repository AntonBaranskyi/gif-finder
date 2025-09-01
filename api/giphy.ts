import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    const { path, ...queryParams } = req.query
    const apiKey = process.env.VITE_GIPHY_API_KEY
    
    if (!apiKey) {
      return res.status(500).json({ error: 'Giphy API key not configured' })
    }

    const giphyUrl = `https://api.giphy.com/v1/${path}`
    const url = new URL(giphyUrl)
    
    // Add API key and other query parameters
    url.searchParams.set('api_key', apiKey)
    Object.entries(queryParams).forEach(([key, value]) => {
      if (typeof value === 'string') {
        url.searchParams.set(key, value)
      }
    })

    const response = await fetch(url.toString())
    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json(data)
    }

    res.status(200).json(data)
  } catch (error) {
    console.error('Giphy API proxy error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

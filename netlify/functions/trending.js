exports.handler = async function(event, context) {
  console.log('Trending function called:', {
    method: event.httpMethod,
    path: event.path,
    queryStringParameters: event.queryStringParameters
  })

  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400'
  }

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request')
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  try {
    const { limit = '10', rating = 'g' } = event.queryStringParameters || {}
    const apiKey = process.env.VITE_GIPHY_API_KEY
    
    console.log('Processing trending request:', { limit, rating, hasApiKey: !!apiKey })
    
    if (!apiKey) {
      console.error('Giphy API key not configured')
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Giphy API key not configured' })
      }
    }

    // Construct the Giphy API URL
    const giphyUrl = 'https://api.giphy.com/v1/gifs/trending'
    const url = new URL(giphyUrl)
    
    // Add parameters
    url.searchParams.set('api_key', apiKey)
    url.searchParams.set('limit', limit)
    url.searchParams.set('rating', rating)

    console.log('Making request to Giphy:', url.toString())

    // Make request to Giphy API
    const response = await fetch(url.toString())
    const data = await response.json()

    console.log('Giphy response status:', response.status)

    if (!response.ok) {
      console.error('Giphy API error:', data)
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify(data)
      }
    }

    console.log('Successfully proxied Giphy trending response')
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    }
  } catch (error) {
    console.error('Trending function error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      })
    }
  }
}

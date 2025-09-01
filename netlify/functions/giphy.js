exports.handler = async function(event, context) {
  console.log('Giphy function called:', {
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
    const { path, ...queryParams } = event.queryStringParameters || {}
    const apiKey = process.env.VITE_GIPHY_API_KEY
    
    console.log('Processing request:', { path, queryParams, hasApiKey: !!apiKey })
    
    if (!apiKey) {
      console.error('Giphy API key not configured')
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Giphy API key not configured' })
      }
    }

    if (!path) {
      console.error('Path parameter is required')
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Path parameter is required' })
      }
    }

    // Construct the Giphy API URL
    const giphyUrl = `https://api.giphy.com/v1/${path}`
    const url = new URL(giphyUrl)
    
    // Add API key and other query parameters
    url.searchParams.set('api_key', apiKey)
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value) {
          url.searchParams.set(key, value)
        }
      })
    }

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

    console.log('Successfully proxied Giphy response')
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    }
  } catch (error) {
    console.error('Giphy API proxy error:', error)
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

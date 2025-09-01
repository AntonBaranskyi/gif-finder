exports.handler = async function(event, context) {
  console.log('Test function called:', {
    method: event.httpMethod,
    path: event.path,
    queryStringParameters: event.queryStringParameters
  })

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400'
  }

  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request')
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: 'Netlify Function is working!',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      functionName: 'test',
      method: event.httpMethod,
      path: event.path
    })
  }
}

// Environment variables configuration
export const env = {
  // Giphy API
  GIPHY_API_KEY: import.meta.env.VITE_GIPHY_API_KEY,
  
  // App configuration
  APP_TITLE: import.meta.env.VITE_APP_TITLE || 'GIF Finder',
  API_BASE_URL: import.meta.env.DEV 
    ? '/api' 
    : (import.meta.env.VITE_API_BASE_URL || 'https://api.giphy.com/v1').replace(/\/$/, ''),
  
  // Development settings
  DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === 'true',
  LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || 'info',
  
  // Environment
  NODE_ENV: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
} as const

// Validation function
export function validateEnv() {
  const requiredVars = ['GIPHY_API_KEY']
  const missingVars = requiredVars.filter(varName => !env[varName as keyof typeof env])
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars)
    console.error('Please check your .env file')
    return false
  }
  
  return true
}

// Helper function to get environment variable with fallback
export function getEnvVar(key: string, fallback?: string): string {
  const value = import.meta.env[key]
  if (value !== undefined) {
    return value
  }
  
  if (fallback !== undefined) {
    return fallback
  }
  
  throw new Error(`Environment variable ${key} is required but not set`)
}

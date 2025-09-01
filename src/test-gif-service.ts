// Test your gifService
import { gifService } from './service/gif.service'

// Test function
export async function testGifService() {
    try {
        console.log('Testing gifService.searchGifs...')
        
        const result = await gifService.searchGifs('cat', 0, 5)
        console.log('Search result:', result)
        
        return result
    } catch (error) {
        console.error('Error testing gifService:', error)
        throw error
    }
}

// Export for use in components
export { gifService }

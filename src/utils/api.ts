import { apiCall } from '@/utils/apiHelpers'

export async function fetchBlogs() {
    try {
        const response = await apiCall.get('/post')
        return response.data
    } catch (error) {
        console.error('Error fetching blogs:', error)
        return []
    }
}

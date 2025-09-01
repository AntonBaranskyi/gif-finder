// Types for Giphy API
export interface GiphyGif {
  id: string
  title: string
  url: string
  images: {
    original: {
      url: string
      width: string
      height: string
    }
    fixed_height: {
      url: string
      width: string
      height: string
    }
    fixed_width: {
      url: string
      width: string
      height: string
    }
  }
  rating: string
  username?: string
  import_datetime: string
  trending_datetime: string
}

export interface GiphySearchResponse {
  data: GiphyGif[]
  pagination: {
    total_count: number
    count: number
    offset: number
  }
  meta: {
    status: number
    msg: string
    response_id: string
  }
}

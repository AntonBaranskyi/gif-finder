import { HttpFactoryService } from "../shared/services/http-factory.service";
import type { HttpService } from "../shared/services/http.service";
import { env, validateEnv } from "../shared/utils/env";
import type { GiphySearchResponse } from "../types/giphy.types";

export class GifService {
	private readonly apiKey: string

    constructor(private readonly httpService: HttpService) {
        if (!validateEnv()) {
            throw new Error('Giphy API key is required. Please set VITE_GIPHY_API_KEY in your .env file')
        }
        this.apiKey = env.GIPHY_API_KEY
    }

    public async searchGifs(search: string, offset: number = 0, limit: number = 10): Promise<GiphySearchResponse> {
        const searchParams: Record<string, string> = {
            api_key: this.apiKey,
            q: search,
            offset: offset.toString(),
            limit: limit.toString(),
            rating: 'g'
        }

        return this.httpService.get<GiphySearchResponse>(`gifs/search`, {
            params: searchParams
        })
    }
}

export const gifService = new GifService(
    new HttpFactoryService().createHttpService(env.API_BASE_URL)
);
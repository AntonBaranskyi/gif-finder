import {
	HttpService,
} from './http.service'
import {
	mainAxios,
} from './mainAxion'

export class HttpFactoryService {
	public createHttpService(baseUrl: string): HttpService {
		return new HttpService(mainAxios, baseUrl)
	}
}

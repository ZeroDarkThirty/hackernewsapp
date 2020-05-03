import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://api.hnpwa.com/v0/";

const responseBody = (res: AxiosResponse) => res.data;

const delay = (ms: number) => (response: AxiosResponse) => {
    return new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms))
}

const requests = {
    get: (url: string) => axios.get(url).then(delay(1000)).then(responseBody),
}

export const hackerNewsApiCalls = {
    getTopStories: (): Promise<any[]> => requests.get("news/1.json"),
    getStory: (id: number): Promise<any> => requests.get(`item/${id}.json`)
}
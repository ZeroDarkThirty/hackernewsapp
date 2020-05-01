import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://api.hnpwa.com/v0/";

const responseBody = (res: AxiosResponse) => res.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
}

export const hackerNewsApiCalls = {
    getTopStories: (): Promise<any[]> => requests.get("news/1.json"),
    getStory: (id: string): Promise<any> => requests.get(`item/${id}.json`)
}
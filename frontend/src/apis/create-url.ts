import axios from "@/lib/axios"

type CreateUrlDto = {
  url: string;
}

export function createShortenUrl(body: CreateUrlDto) {
  return axios.post<CreateShortenUrlResponse>('/', body)
}

export type CreateShortenUrlResponse = {
  hash: string
}
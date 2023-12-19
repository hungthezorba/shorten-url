import axios from "@/lib/axios"

type GetUrlDto = {
  key: string;
}

export function getUrl(params: GetUrlDto) {
  return axios.get(`/${params.key}`, )
}
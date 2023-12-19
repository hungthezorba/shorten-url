import { getUrl } from "@/apis/get-url"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export function RedirectPage() {
  const params = useParams()
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const url = (await getUrl({key: params.hash || ''})).data.url
      if (url) {
        window.location.href = url
      } else {
        navigate('/', {replace: true})
      }
    })()
  }, [params, navigate])
  return (<></>)
}
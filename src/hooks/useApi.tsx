import { useCallback, useEffect, useState } from 'react'

type useApiResponse<ResponseData> =
  // Initial
  | {
      readonly data: null
      readonly isLoading: true
      readonly error: false
    }
  // Success
  | {
      readonly data: ResponseData
      readonly isLoading: false
      readonly error: false
    }
  // Error
  | {
      readonly data: null
      readonly isLoading: false
      readonly error: true
    }

export const useApi = <ResponseData,>(path: string) => {
  const [response, setResponse] = useState<useApiResponse<ResponseData>>({ data: null, isLoading: true, error: false })

  const f = useCallback(async () => {
    try {
      const res = await fetch(path)
      const data: ResponseData = await res.json()

      setResponse({ data, isLoading: false, error: false })
    } catch (err) {
      setResponse({ data: null, isLoading: false, error: true })
    }
  }, [path])

  useEffect(() => {
    f()
      .then()
      .catch(err => console.log(err))
  }, [path, f])

  return response
}

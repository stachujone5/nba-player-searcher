export const f = async <ResponseData>(path: string) => {
  const res = await fetch(path)

  if (!res.ok) {
    throw new Error('Failed to fetch')
  }

  const data: ResponseData = await res.json()

  return data
}

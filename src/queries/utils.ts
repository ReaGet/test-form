export const getRequestHeaders = () => {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  headers.append('Accept-Language', 'en')
  headers.append('x-api-key', import.meta.env.VITE_API_KEY)
  headers.append('X-CF-TURNSTILE-TOKEN', '')
  return headers
}
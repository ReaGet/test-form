import i18n from '../i18n'

export const getRequestHeaders = () => {
  const { locale } = i18n.global
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  headers.append('Accept-Language', locale.value)
  headers.append('x-api-key', import.meta.env.VITE_API_KEY)
  headers.append('X-CF-TURNSTILE-TOKEN', '')
  return headers
}
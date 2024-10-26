import { ref, type Ref } from "vue"

type FetchReturnType<T> = {
  isLoading: Ref<boolean>
  isError: Ref<boolean>
  data: Ref<T|null>
  error: Ref<string>
  refresh: () => void
}

type LazyFetchReturnType<T> = [
  () => void,
  FetchReturnType<T>
]

type FetchOptions = {
  method: 'GET' | 'POST'
  headers?: Record<string, string>,
}

const defaultOptions: FetchOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}

export const useLazyFetch = <T>(url: string, options: FetchOptions = defaultOptions): LazyFetchReturnType<T> => {
  const isLoading = ref(false)
  const isError = ref(false)
  const data = ref<T|null>(null)
  const error = ref<any>('')
  const finalOptions: FetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  }

  const setError = (e: Error) => {
    isError.value = true
    error.value = e
  }

  const tryFetch = async () => {
    try {
      return await fetch(url, finalOptions)
        .then(res => res.json())
        .then(result => {
          data.value = result
          isError.value = false
          error.value = null
        }).catch((e) => setError(e))
        .finally(() => {
          isLoading.value = false
        })
    } catch(e) {
      setError(e as Error)
    }
  }

  return [
    async () => await tryFetch(),
    {
      isLoading,
      isError,
      error,
      refresh: () => { tryFetch() },
      data: data as Ref<T|null>,
    }
  ]
}

export const useFetch = <T>(url: string, options: FetchOptions = defaultOptions): FetchReturnType<T> => {
  const [$fetch, data] = useLazyFetch<T>(url, options)

  $fetch()

  return data
}
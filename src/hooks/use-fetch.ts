import { ref, type Ref } from "vue"

type FetchReturnType<T> = {
  isLoading: Ref<boolean>
  isError: Ref<boolean>
  data: Ref<T|null>
  error: Ref<string>
  refresh: () => void
}

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

export const useLazyFetch = <T>(url: string, options: FetchOptions = defaultOptions): [() => Promise<T>] => {
  const finalOptions: FetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  }

  const tryFetch = async () => {
    try {
      return await fetch(url, finalOptions)
        .then(res => res.json())
        .then(result => {
          return result as T
        })
    } catch(e) {
      return Promise.reject(e)
    }
  }

  return [
    async () => await tryFetch(),

  ]
}

export const useFetch = <T>(url: string, options: FetchOptions = defaultOptions): FetchReturnType<T> => {
  const isLoading = ref(false)
  const isError = ref(false)
  const data = ref<T|null>(null)
  const error = ref<any>('')
  const [$fetch] = useLazyFetch<T>(url, options)

  const tryFetch = async () => {
    $fetch().then(result => {
      data.value = result
      isError.value = false
    }).catch(e => {
      isError.value = true
      error.value = e
    })
  }

  tryFetch()

  return {
    isLoading,
    isError,
    error,
    refresh: () => { tryFetch() },
    data//: (data.value),
  }
}
import { getRequestHeaders } from './utils'

export type CreateSessionPayload = {
  to: string
  type: string
  send?: boolean
}

export type ChannelType = {
  name: string
  type: string
  is_active: boolean
  timeout: number
  description: string
  image_url: string
  link: string
}

export type CreateSessionResponse = {
  session_id: string
  session_expired_at: string
  sent_to: string
  channels: ChannelType[]
}

export const createSession = async (payload: CreateSessionPayload): Promise<CreateSessionResponse|null> => {
  const body = JSON.stringify(payload)

  try {
    return await fetch(`${import.meta.env.VITE_API_URL}/create`, {
      method: 'POST',
      headers: getRequestHeaders(),
      body,
      redirect: 'follow'
    })
    .then(response => response.json())
  }
  catch (e) {
    console.log(e)
    return null
  }
}

export type SendSessionPayload = {
  session_id: string
  type: string
} 

export type SendSessionResponse = {
  session_id: string
  session_expired_at: string
  channels: ChannelType[]
}

export const sendSession = async (payload: SendSessionPayload): Promise<SendSessionResponse|null> => {
  const body = JSON.stringify(payload)

  try {
    return await fetch(`${import.meta.env.VITE_API_URL}/send`, {
      method: 'POST',
      headers: getRequestHeaders(),
      body,
    })
    .then(response => response.json())
  }
  catch (e) {
    console.log(e)
    return null
  }
}
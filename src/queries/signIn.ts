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

const makeRequest = async (path: string, body: string) => {
  return await fetch(`${import.meta.env.VITE_API_URL}/${path}`, {
    method: 'POST',
    headers: getRequestHeaders(),
    body,
    redirect: 'follow'
  })
  .then(response => response.json())
}

export const createSession = async (payload: CreateSessionPayload): Promise<CreateSessionResponse|null> => {
  try {
    return await makeRequest(
      'create',
      JSON.stringify(payload)
    )
  }
  catch (e) {
    console.log(e)
    return null
  }
}

export type SendCodePayload = {
  session_id: string
  type: string
} 

export type SendCodeResponse = {
  session_id: string
  session_expired_at: string
  channels: ChannelType[]
}

export const sendCode = async (payload: SendCodePayload): Promise<SendCodeResponse|null> => {
  try {
    return await makeRequest(
      'send',
      JSON.stringify(payload)
    )
  }
  catch (e) {
    console.log(e)
    return null
  }
}

export type CheckCodePayload = {
  session_id: string
  code: string
} 

export type CheckCodeResponse = {
  verify_token: string
  is_test: boolean
}

export const checkCode = async (payload: CheckCodePayload): Promise<CheckCodeResponse|null> => {
  try {
    return await makeRequest(
      'check',
      JSON.stringify(payload)
    )
  }
  catch (e) {
    console.log(e)
    return null
  }
}
import { CountryCodeType } from '../types'
const codesUrl = 'https://codes.free.beeceptor.com/codes'
const codes: CountryCodeType[] = [{"name":"Russia","flag":"🇷🇺","code":"RU","dial_code":"+7"},{"name":"Afghanistan","flag":"🇦🇫","code":"AF","dial_code":"+93"},{"name":"Åland Islands","flag":"🇦🇽","code":"AX","dial_code":"+358"},{"name":"Albania","flag":"🇦🇱","code":"AL","dial_code":"+355"},{"name":"Algeria","flag":"🇩🇿","code":"DZ","dial_code":"+213"},{"name":"American Samoa","flag":"🇦🇸","code":"AS","dial_code":"+1684"}]

export const getCountryCodes = async (): Promise<CountryCodeType[]> => {
  try {
    return codes
    return await fetch(codesUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
  }
  catch (e) {
    console.log(e)
    return [] as CountryCodeType[]
  }
}
const codesUrl = 'https://gist.githubusercontent.com/DmytroLisitsyn/1c31186e5b66f1d6c52da6b5c70b12ad/raw/2bc71083a77106afec2ec37cf49d05ee54be1a22/country_dial_info.json'

export default class PhoneCodes {
  static async getAll() {
    try {
      return await fetch(codesUrl)
    } catch (e) {
      console.log('[phoneCodes]', e)
    }
  }
}
<template>
  <div class="flex flex-col gap-16 mt-12">
    <PhoneCodeSelector
      @change="handleCountryCodeChange"
      :default-value="countryCode"
    />
    <Input
      name="phone"
      :placeholder="t('step1.phone_number')"
      v-model="phoneNumber"
      @input="handleInput"
      :error="error"
    />
    <div class="flex gap-4">
      <button
        @click="handleClick"
        class="h-[5.5rem] w-full mt-4 bg-primary hover:bg-primary-hover text-[1.6rem] text-white rounded-lg transition-colors"
      >{{ t('continue') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PhoneCodeSelector from '../../phone-code-selector.vue'
import Input from '../../ui/input.vue'
import { ref } from 'vue'
import { injectLoginContext } from './form.vue'
import { CountryCode, isValidNumberForRegion } from 'libphonenumber-js'
import { CountryCodeType } from '../../../types'
import { useI18n} from 'vue-i18n'

const { t } = useI18n()

const error = ref<string>('')

const { nextStep, countryCode, phoneNumber } = injectLoginContext()

const handleCountryCodeChange = (code: CountryCodeType) => {
  countryCode.value = code
  phoneNumber.value = `${code.dial_code} `
}

const handleClick = () => {
  validate()
  if (!error.value) nextStep()
}

const handleInput = () => validate()

const validate = () => {
  const _countryCode = (countryCode.value?.code || '') as CountryCode

  if (
    !isValidNumberForRegion(phoneNumber.value, _countryCode)
  ) return error.value = t('step1.phone_wrong_format')

  error.value = ''
}
</script>
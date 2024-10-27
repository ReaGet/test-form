<template>
  <div class="flex flex-col w-full max-w-[500px] px-12 py-10 border rounded-xl">
    <div class="flex flex-col gap-12 mt-10">
      <div class="flex items-center justify-center w-full max-w-[300px] h-16 px-8 mx-auto bg-[#f8f8f8] text-[1.4rem] text-[#989898] rounded-lg">
        Логотип (Высота 40px, длина до 300px)
      </div>
      <div class="text-center">
        <div class="text-[3.2rem] leading-[3.75rem] font-medium">{{ t(`step${currentStep+1}.heading`) }}</div>
        <div class="mt-6 text-[1.6rem] leading-[1.875rem] text-[#666]">{{ t(`step${currentStep+1}.subheading`) }}</div>
      </div>
    </div>

    <div class="flex flex-col gap-16 mt-12">
      <template v-if="currentStep === 0"><Step1 /></template>
      <template v-else-if="currentStep === 1"><Step2 /></template>
    </div>
    
    <div class="flex justify-between mt-28 text-[1.2rem] leading-[2.4rem] text-[#666]">
      <select class="outline-none" v-model="locale">
        <option v-for="locale in supportedLocales" :value="locale" :key="locale">{{ locale }}</option>
      </select>
      <div>
        <a class="mr-12 hover:text-black/80 transition-colors" href="#">{{ t(`conditions`) }}</a>
        <a class="hover:text-black/80 transition-colors" href="#">{{ t(`confidentiality`) }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
type LoginFormContext = {
  nextStep: () => void
  prevStep: () => void
  countryCode: Ref<CountryCodeType|null>
  phoneNumber: Ref<string>
  countryCodeList: Ref<CountryCodeType[]>
  session: Ref<CreateSessionResponse|null>
}

export const [injectLoginContext, provideLoginContext] = createContext<LoginFormContext>('LoginFormContext')
</script>

<script setup lang="ts">
import { Ref, ref, onMounted, watch } from 'vue'
import { createContext } from '../../../lib/createContext'
import Step1 from './step1.vue'
import Step2 from './step2.vue'
import { CountryCodeType } from '../../../types'
import { getCountryCodes } from '../../../queries/countryCodes'
import { createSession, CreateSessionPayload, CreateSessionResponse } from '../../../queries/signIn'
import { useI18n } from 'vue-i18n'
import { supportedLocales } from '../../../i18n'

const currentStep = ref(0)
const countryCode = ref<CountryCodeType|null>(null)
const phoneNumber = ref('')
const countryCodeList = ref<CountryCodeType[]>([])
const session = ref<CreateSessionResponse|null>(null)

const { t, locale } = useI18n()

watch(locale, (newLocale) => {
  locale.value = newLocale
  localStorage.setItem('lang', newLocale);
})

onMounted(() => {
  getCountryCodes().then((values) => {
    countryCodeList.value = values
  })
})

const prevStep = () => {
  currentStep.value--
}

const nextStep = () => {
  createSession(getPayload()).then(data => {
    session.value = data
    currentStep.value++
  })
}

const getPayload = (): CreateSessionPayload => {
  return {
    to: phoneNumber.value.split(' ').join(''),
    type: 'whatsapp',
    send: false,
  }
}

provideLoginContext({
  nextStep,
  prevStep,
  countryCode,
  phoneNumber,
  countryCodeList,
  session
})

</script>
<template>
  <div class="flex flex-col w-full max-w-[500px] px-12 py-10 border rounded-xl">
    <div class="flex flex-col gap-12 mt-10">
      <div class="flex items-center justify-center w-full max-w-[300px] h-16 px-8 mx-auto bg-[#f8f8f8] text-[1.4rem] text-[#989898] rounded-lg">
        Логотип (Высота 40px, длина до 300px)
      </div>
      <div class="text-center">
        <div class="text-[3.2rem] leading-[3.75rem] font-medium">{{ currentHeading.heading }}</div>
        <div class="mt-6 text-[1.6rem] leading-[1.875rem] text-[#666]">{{ currentHeading.subheading() }}</div>
      </div>
    </div>

    <div class="flex flex-col gap-16 mt-12">
      <template v-if="currentStep === 0"><Step1 /></template>
      <template v-else-if="currentStep === 1"><Step2 /></template>
    </div>
    
    <div class="flex justify-between mt-28 text-[1.2rem] leading-[2.4rem] text-[#666]">
      <div class="flex items-center gap-3 text-[#666] hover:text-black/80 transition-colors cursor-pointer">
        Русский
        <IconArrowDownFilled className="fill-current" />
      </div>
      <div>
        <a class="mr-12 hover:text-black/80 transition-colors" href="#">Условия</a>
        <a class="hover:text-black/80 transition-colors" href="#">Конфиденциальность</a>
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

const headings = [
  {
    heading: 'Введите номер телефона',
    subheading: () => 'Чтобы войти или зарегистрироваться'
  },
  {
    heading: 'Введите код',
    subheading: (phoneNumber = '') => `Отправлен по номеру ${phoneNumber}`
  }
]
</script>

<script setup lang="ts">
import { computed, Ref, ref, onMounted } from 'vue'
import { createContext } from '../../../lib/createContext'
import IconArrowDownFilled from '../../icons/i-arrow-down-filled.vue'
import Step1 from './step1.vue'
import Step2 from './step2.vue'
import { CountryCodeType } from '../../../types'
import { getCountryCodes } from '../../../queries/countryCodes'
import { createSession, CreateSessionPayload, CreateSessionResponse } from '../../../queries/signIn'

const currentStep = ref(0)
const countryCode = ref<CountryCodeType|null>(null)
const phoneNumber = ref('')
const countryCodeList = ref<CountryCodeType[]>([])
const session = ref<CreateSessionResponse|null>(null)

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

const currentHeading = computed(() => {
  const max = headings.length - 1
  return headings[Math.max(0, Math.min(currentStep.value, max))]
})

</script>
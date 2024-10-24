<template>
  <div class="flex flex-col w-full max-w-[500px] px-12 py-10 border rounded-xl">
    <div class="flex flex-col gap-12 mt-10">
      <div class="flex items-center justify-center w-full max-w-[300px] h-16 px-8 mx-auto bg-[#f8f8f8] text-[1.4rem] text-[#989898] rounded-lg">
        Логотип (Высота 40px, длина до 300px)
      </div>
      <div class="text-center">
        <div class="text-[3.2rem] leading-[3.75rem] font-medium">Введите номер телефона</div>
        <div class="mt-6 text-[1.6rem] leading-[1.875rem] text-[#666]">Чтобы войти или зарегистрироваться</div>
      </div>
    </div>

    <form action="" @submit.prevent class="flex flex-col gap-16 mt-12">
      <PhoneCodeSelector />
      <Input name="phone" placeholder="Номер телефона" v-model="phoneValue" />
      <div class="flex gap-4">
        <button
          class="flex justify-center items-center gap-4 h-[5.5rem] w-full mt-4 text-primary hover:text-[#046fe3] text-[1.6rem] rounded-lg transition-colors hover:bg-[#f8f8f8]"
        >
          <IconArrowLeft className="fill-current" color="''" :width="16" :height="16"/> Назад
        </button>
        <button class="h-[5.5rem] w-full mt-4 bg-primary hover:bg-[#046fe3] text-[1.6rem] text-white rounded-lg transition-colors">Продолжить</button>
      </div>
    </form>
    
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

<script setup lang="ts">
import PhoneCodeSelector from '../phone-code-selector.vue'
import IconArrowDownFilled from '../icons/i-arrow-down-filled.vue'
import IconArrowLeft from '../icons/i-arrow-left.vue'
import Input from '../ui/input.vue'
import { ref } from 'vue';

const phoneValue = ref('')
</script>
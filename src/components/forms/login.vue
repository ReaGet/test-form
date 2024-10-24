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
      <div class="relative w-full">
        <div class="h-[5.5rem] p-6 border border-black/10 hover:border-black/20 rounded-lg cursor-pointer">
          <span class="absolute -top-3 left-8 text-[1.2rem] text-[#9E9E9E] leading-[1.6rem] bg-white">Страна</span>
          <div class="flex">
            <div class="text-[1.6rem] leading-[2.4rem] line-clamp-1">Выберите из списка</div>
            <IconArrowDown class="shrink-0 ml-auto" />
          </div>
        </div>

        <div class="absolute hidden w-full mt-2 top-full shadow-custom bg-white z-10">
          <div class="p-6">
            <div class="relative flex items-center">
              <IconSearch width="20" height="20" class="absolute left-4" />
              <input
                type="text"
                class="w-full py-4 pl-14 pr-4 text-[1.4rem] bg-[#F8F8F8] placeholder:text-[#9E9E9E] outline-none rounded-xl"
                placeholder="Поиск"
              >
            </div>
          </div>
          <ul class="scroll max-h-[300px] pl-2 mr-2 mb-6 overflow-y-auto">
            <li
              v-for="item in data"
              :key="item.code"
              class="flex items-center h-[4.8rem] px-4 mr-2 text-[1.6rem] rounded-lg hover:bg-[#F8F8F8] transition-colors cursor-pointer"
            >
              <i class="text-[2rem]">{{ item.flag }}</i>
              <span class="ml-4">{{ item.name }}</span>
              <strong class="ml-auto">{{ item.dial_code }}</strong>
            </li>
          </ul>
        </div>
      </div>
      <input
        class="w-full p-6 border border-black/10 focus:border-black/20 hover:border-black/20 rounded-lg text-[1.6rem] leading-[2.4rem] placeholder:text-[#9E9E9E] outline-none"
        placeholder="Номер телефона"
      />
      <button class="h-[5.5rem] w-full mt-4 bg-primary hover:bg-[#046fe3] text-[1.6rem] text-white rounded-lg transition-colors">Продолжить</button>
    </form>
    
    <div class="flex justify-between mt-28 text-[1.2rem] leading-[2.4rem] text-[#666]">
      <div class="flex items-center gap-3 text-[#666] hover:text-black/80 transition-colors cursor-pointer">
        Русский
        <IconArrowDownFilled class="fill-current" />
      </div>
      <div>
        <a class="mr-12 hover:text-black/80 transition-colors" href="#">Условия</a>
        <a class="hover:text-black/80 transition-colors" href="#">Конфиденциальность</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconArrowDown from '../icons/i-arrow-down.vue'
import IconArrowDownFilled from '../icons/i-arrow-down-filled.vue'
import IconSearch from '../icons/i-search.vue'

const data = [{"name":"Afghanistan","flag":"🇦🇫","code":"AF","dial_code":"+93"},{"name":"Åland Islands","flag":"🇦🇽","code":"AX","dial_code":"+358"},{"name":"Albania","flag":"🇦🇱","code":"AL","dial_code":"+355"},{"name":"Algeria","flag":"🇩🇿","code":"DZ","dial_code":"+213"},{"name":"American Samoa","flag":"🇦🇸","code":"AS","dial_code":"+1684"},{"name":"Andorra","flag":"🇦🇩","code":"AD","dial_code":"+376"}]

</script>
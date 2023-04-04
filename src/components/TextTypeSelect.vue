<script setup>
import { useContentStore } from "../stores/content";
const contentStore = useContentStore();
</script>

<template>
  <div class="w-3/12 mx-40 mt-10">
    <label
      for="text-type"
      class="block text-sm font-medium leading-6 text-gray-900"
      >What type of text is it?</label
    >
    <select
      id="text-type"
      name="text-type"
      v-model="contentStore.textType"
      class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      <option></option>
      <option>job interview</option>
      <option>podcast</option>
      <option>news story</option>
    </select>
  </div>
</template>

<style scoped></style>

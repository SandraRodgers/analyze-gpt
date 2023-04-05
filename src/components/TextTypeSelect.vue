<script setup>
import { useContentStore } from "../stores/content";
const contentStore = useContentStore();
</script>

<template>
  <div class="mx-0 mt-6">
    <h3 class="text-base font-semibold leading-6 text-gray-900 mb-2">Step 1</h3>
    <label
      for="text-type"
      class="block text-sm font-medium leading-6 text-gray-900"
      >What do you want to analyze?</label
    >
    <div class="mx-0 sm:mx-10 mt-6">
      <select
        id="text-type"
        name="text-type"
        v-model="contentStore.textType"
        class="mt-2 text-sm block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <option></option>
        <option>job interview</option>
        <option>podcast</option>
        <option>news story</option>
        <option>quote</option>
        <option>recording</option>
      </select>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { ref } from "vue";
import { useContentStore } from "../stores/content";

const props = defineProps(["questionNum", "index"]);
const contentStore = useContentStore();
</script>

<template>
  <div>
    <label
      :for="`Question ${questionNum}`"
      class="block text-sm font-medium leading-6 text-gray-900"
      >Question {{ questionNum }}</label
    >
    <div class="mt-2">
      <input
        v-model="contentStore.questionIncrement[`question${index}`]"
        :name="`Question ${questionNum}`"
        class="text-sm block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Write a question you want to ask about the text"
      />
    </div>
  </div>
</template>

<style scoped></style>

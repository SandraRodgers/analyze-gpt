<script setup>
import FormInput from "../components/FormInput.vue";
import { useContentStore } from "../stores/content";
import { PlusIcon } from "@heroicons/vue/20/solid";

const contentStore = useContentStore();
</script>

<template>
  <div class="mt-10">
    <h3 class="text-base mx-0 mt-20 font-semibold leading-6 text-gray-900 mb-2">
      Step 3
    </h3>
    <p class="block mb-6 text-sm font-medium leading-6 text-gray-900 mx-0 mt-4">
      Ask as many questions as you want about the document:
    </p>
    <div class="mx-0 sm:mx-10">
      <div
        v-for="(num, index) in contentStore.numInputs"
        :key="num"
        class="mx-0 mt-10"
      >
        <form-input :questionNum="num" :index="index + 1" />
      </div>
      <div class="mt-10 mx-0 flex justify-center">
        <button
          @click="contentStore.numInputs++"
          type="button"
          class="rounded-full bg-indigo-200 p-2 text-gray-900 shadow-sm hover:bg-indigo-50 ring-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div class="mx-0 mt-20 flex justify-center">
        <a
          href="#step-4"
          v-smooth-scroll
          type="button"
          @click="contentStore.addQuestions"
          class="text-center rounded w-80 mb-10 bg-indigo-600 px-2 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

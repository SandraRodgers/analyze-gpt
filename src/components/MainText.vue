<script setup>
import { ref } from "vue";
import { useContentStore } from "../stores/content";
const contentStore = useContentStore();
</script>

<template>
  <div class="mx-40 mt-10">
    <label
      for="comment"
      class="block text-sm font-medium leading-6 text-gray-900"
      >Add your text</label
    >
    <div class="mt-2">
      <textarea
        rows="4"
        v-model="contentStore.mainText"
        @input="contentStore.checkTokens($event)"
        class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
      />
      <div class="flex items-center mt-1" v-show="contentStore.tokenLoading">
        <span class="mr-4 text-xs animate-pulse">Getting token length...</span>
        <svg
          class="animate-spin -ml-1 mr-3 h-4 w-5 text-indigo-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      <div v-show="contentStore.tokenLength > 0" class="text-xs mt-1">
        Token length: {{ contentStore.tokenLength }}
      </div>
      <!-- <button
        @click="contentStore.sendMainText()"
        type="button"
        class="rounded bg-indigo-600 mt-2 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Submit
      </button> -->
    </div>
  </div>
</template>

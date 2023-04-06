<script setup>
import { useContentStore } from "../stores/content";
import { CheckCircleIcon } from "@heroicons/vue/20/solid";
import { storeToRefs } from "pinia";
const contentStore = useContentStore();

const { loadingGPT, showAnalysis } = storeToRefs(contentStore);
</script>

<template>
  <div class="mx-0 mb-80">
    <h3 class="text-base mt-40 font-semibold leading-6 text-gray-900 mb-2">
      Step 4
    </h3>
    <p
      id="sec-3"
      for="text-type"
      class="block text-sm font-medium leading-6 text-gray-900 mb-6"
    >
      Get your analysis:
    </p>
    <!-- Loader -->
    <div v-if="loadingGPT" class="flex items-center ml-4">
      <span class="mr-4 text-xs animate-pulse">Analyzing...</span>
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
    <!-- Analysis result -->
    <div v-if="showAnalysis">
      <div
        class="bg-green-50 rounded-md p-4 mb-4 my-2 flex items-center"
        v-for="answer in contentStore.formattedAnalysis"
        :key="answer"
      >
        <div class="flex-shrink-0">
          <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <div class="text-sm text-green-700">
            <p>Answer: {{ answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

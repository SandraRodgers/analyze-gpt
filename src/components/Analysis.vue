<script setup>
import { useContentStore } from "../stores/content";
import { CheckCircleIcon } from "@heroicons/vue/20/solid";
const contentStore = useContentStore();
</script>

<template>
  <div class="mx-40 mb-40">
    <h3 class="text-base mt-10 font-semibold leading-6 text-gray-900 mb-2">
      Step 4
    </h3>
    <p
      for="text-type"
      class="block text-sm font-medium leading-6 text-gray-900 mb-6"
    >
      Get your analysis:
    </p>
    <div v-if="contentStore.gptAnalysis.length">
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

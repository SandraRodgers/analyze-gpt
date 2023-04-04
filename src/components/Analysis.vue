<script setup>
import { useContentStore } from "../stores/content";
import { CheckCircleIcon } from "@heroicons/vue/20/solid";
const contentStore = useContentStore();
</script>

<template>
  <div class="mx-40 mb-40">
    <h3 class="text-base mt-20 font-semibold leading-6 text-gray-900 mb-2">
      Step 4
    </h3>
    <p
      for="text-type"
      class="block text-sm font-medium leading-6 text-gray-900 mb-6"
    >
      Get your analysis:
    </p>
    <div
      v-if="contentStore.gptAnalysis.length"
      class="rounded-md bg-green-50 p-4"
    >
      <div class="flex">
        <div class="flex-shrink-0">
          <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-green-800">Analyze GPT</h3>
          <div class="mt-2 text-sm text-green-700">
            <p>{{ contentStore.gptAnalysis }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

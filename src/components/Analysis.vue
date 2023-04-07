<script setup>
import { useContentStore } from "../stores/content";
import { CheckCircleIcon } from "@heroicons/vue/20/solid";
import { storeToRefs } from "pinia";
import Loader from "../components/Loader.vue";
const contentStore = useContentStore();

const { gptAnalysis, formattedAnalysis, singleAnswer } =
  storeToRefs(contentStore);
</script>

<template>
  <div class="mx-0 mb-80">
    <h3 class="text-base mt-40 font-semibold leading-6 text-gray-900 mb-2">
      Step 4
    </h3>
    <p
      id="step-4"
      for="text-type"
      class="block text-sm font-medium leading-6 text-gray-900 mb-6"
    >
      Get your analysis:
    </p>
    <!-- Loader -->
    <loader />
    <!-- Analysis result -->
    <div v-if="!singleAnswer">
      <div
        class="bg-green-50 rounded-md p-4 mb-4 my-2 flex items-center"
        v-for="answer in formattedAnalysis"
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
    <div v-else>
      <div v-if="gptAnalysis.length">
        <div class="bg-green-50 rounded-md p-4 mb-4 my-2 flex items-center">
          <div class="flex-shrink-0">
            <CheckCircleIcon
              class="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          </div>
          <div class="ml-3">
            <div class="text-sm text-green-700">
              <p>{{ gptAnalysis }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

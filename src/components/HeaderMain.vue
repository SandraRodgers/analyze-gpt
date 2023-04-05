<script setup>
import { QuestionMarkCircleIcon } from "@heroicons/vue/20/solid";
</script>

<template>
  <div class="px-6 py-24 sm:py-32 lg:px-8 bg-white">
    <div class="mx-auto max-w-2xl text-center">
      <div class="flex justify-center">
        <h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          analyzeGPT
        </h2>
        <div class="flex-shrink-0">
          <QuestionMarkCircleIcon
            class="h-5 w-10 text-indigo-400"
            aria-hidden="true"
          />
        </div>
      </div>
      <p class="mt-6 text-sm sm:text-base lg:text-lg leading-8 text-gray-600">
        The brain of OpenAI to analyze audio and video documents. Audio
        transcription powered by Deepgram.
      </p>
    </div>
  </div>
</template>

<style scoped>
svg {
  height: 2.25rem;
}
</style>

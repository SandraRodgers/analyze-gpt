<script setup>
import TextTypeSelect from "./components/TextTypeSelect.vue";
import MainText from "./components/MainText.vue";
import QuestionsForm from "./components/QuestionsForm.vue";
</script>

<template>
  <main class="flex justify-center w-screen h-screen">
    <div class="flex flex-col bg-white w-[80%]">
      <text-type-select />
      <main-text />
      <questions-form />
    </div>
  </main>
</template>

<style scoped></style>

<script setup>
import TextTypeSelect from "./components/TextTypeSelect.vue";
import MainText from "./components/MainText.vue";
import QuestionsForm from "./components/QuestionsForm.vue";
import Analysis from "./components/Analysis.vue";
import HeaderMain from "./components/HeaderMain.vue";
</script>

<template>
  <header-main />
  <main class="flex flex-col items-center w-screen">
    <div class="flex flex-col bg-white w-[80%]">
      <text-type-select />
      <main-text />
      <questions-form />
      <div>
        <analysis />
      </div>
    </div>
  </main>
</template>

<style scoped></style>

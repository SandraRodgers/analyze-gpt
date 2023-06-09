<script setup>
import { ref, watch } from "vue";
import { useContentStore } from "../stores/content";
import { DocumentTextIcon, MusicalNoteIcon } from "@heroicons/vue/20/solid";

let file = ref([]);
const contentStore = useContentStore();
const tabs = ref([
  { name: "Audio", icon: MusicalNoteIcon, current: true },
  { name: "Text", icon: DocumentTextIcon, current: false },
]);
const isTranscribing = ref(false);
const transcript = ref("");

function switchTab(tab) {
  tabs.value.forEach((t) => {
    t.name === tab ? (t.current = true) : (t.current = false);
  });
  if (transcript.value) {
    contentStore.checkTokens(transcript.value);
  }
}

function sendFile() {
  if (file.value.length === 0) {
    alert("Please attach a file");
  } else {
    const formData = new FormData();
    formData.append("username", "Sandra Rodgers");
    formData.append("file", file.value);
    isTranscribing.value = true;
    fetch("http://localhost:3000/dg-transcription", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        transcript.value =
          data.apiCall.results.channels[0].alternatives[0].transcript;
        file.value = [];
        contentStore.mainText = transcript.value;
        isTranscribing.value = false;
      });
  }
}

function handleAudioFile(e) {
  file.value = e.target.files;
  for (let i = 0; i <= file.value.length - 1; i++) {
    file.value = file.value[i];
  }
}

function reset() {
  file.value = [];
  if (tabs && tabs[0] && tabs[0].current) {
    document.getElementById("file").value = "";
  }

  transcript.value = "";
  contentStore.mainText = "";
  contentStore.tokenLength = 0;
}

watch(transcript, () => {
  if (transcript.value) {
    contentStore.checkTokens(transcript.value);
  }
});
</script>

<template>
  <div class="min-h-[450px]">
    <div class="mx-0 mt-40">
      <h3 class="text-base font-semibold leading-6 text-gray-900 mb-2">
        Step 2
      </h3>
      <p
        for="text-type"
        class="block text-sm font-medium leading-6 text-gray-900 mb-6"
      >
        Is your document audio or text?
      </p>

      <div class="mx-0 sm:mx-10">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <a
              v-for="tab in tabs"
              :key="tab.name"
              @click="switchTab(tab.name)"
              :class="[
                tab.current
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium cursor-pointer',
              ]"
              :aria-current="tab.current ? 'page' : undefined"
            >
              <component
                :is="tab.icon"
                :class="[
                  tab.current
                    ? 'text-indigo-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  '-ml-0.5 mr-2 h-5 w-5',
                ]"
                aria-hidden="true"
              />
              <span>{{ tab.name }}</span>
            </a>
          </nav>
        </div>
      </div>
    </div>

    <div v-if="tabs[1].current" class="mx-0 mt-10">
      <label
        for="comment"
        class="block mx-0 sm:mx-10 text-sm leading-6 text-gray-900 mb-20"
        >Copy your text into the field:</label
      >
      <div class="flex flex-col items-end mx-0 sm:mx-10 mt-2">
        <textarea
          rows="4"
          v-model="contentStore.mainText"
          @input="contentStore.checkTokens($event.target.value)"
          class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6 text-sm"
        />
        <div class="w-full mx-10 flex justify-between">
          <div class="text-xs mt-1 mx-10">
            Token length: {{ contentStore.tokenLength }}
          </div>

          <button
            type="button"
            @click="reset()"
            class="relative right-0 rounded bg-white h-6 mr-4 mt-6 px-4 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
    <div v-else class="mx-0 mt-10">
      <div class="h-16 mx-0 sm:mx-10">
        <p class="block mb-6 text-sm leading-6 text-gray-900">
          Select an audio file to transcribe.
          <b>Be sure to click the Transcribe button!</b>
        </p>

        <form>
          <div class="flex sm:flex-row flex-col">
            <label for="file" class="custom-file-upload cursor-pointer">
              <input
                id="file"
                type="file"
                name="file"
                @change="handleAudioFile($event)"
              />
              Select file
            </label>

            <input
              type="submit"
              value="Transcribe"
              @click.prevent="sendFile($event)"
              class="h-6 cursor-pointer rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            />

            <p
              v-if="file"
              class="ml-4 text-xs font-medium leading-6 text-gray-900"
            >
              {{ file.name }}
            </p>
            <div v-if="isTranscribing" class="flex items-center ml-4 sm:ml-4">
              <span class="mr-0 sm:mr-4 text-xs animate-pulse"
                >Transcribing...</span
              >
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
          </div>
        </form>
      </div>
      <div class="flex flex-col items-end mx-10">
        <textarea
          v-if="transcript"
          v-model="transcript"
          @input="contentStore.checkTokens($event.target.value)"
          class="mt-24 sm:mt-10 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 text-sm sm:leading-6"
          rows="4"
        ></textarea>
        <div class="w-full mx-10 flex justify-between">
          <div v-if="transcript" class="text-xs mt-1 mx-10">
            Token length: {{ contentStore.tokenLength }}
          </div>

          <button
            v-if="transcript"
            type="button"
            @click="reset()"
            class="relative right-0 rounded bg-white h-6 mr-4 mt-6 px-4 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
input[type="file"] {
  display: none;
}
.custom-file-upload {
  @apply rounded  mb-4 sm:mb-0 bg-white h-6 mr-0 sm:mr-4 px-4 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50;
}

textarea::placeholder {
  color: black !important;
}
</style>

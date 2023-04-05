import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const useContentStore = defineStore("content", () => {
  const mainText = ref("");
  const textType = ref("");
  const numInputs = ref(1);
  const questionIncrement = ref({});
  const questions = ref("");
  const messages = ref([]);
  const tokenLength = ref(0);
  const tokenLoading = ref(false);
  const gptAnalysis = ref("");
  const loadingGPT = ref(false);
  const showAnalysis = ref(false);
  let num = 0;

  watch(loadingGPT, () => {
    if (loadingGPT.value === true) {
      showAnalysis.value = true;
    }
    if (loadingGPT.value === false) {
      showAnalysis.value = false;
    }
  });

  watch(gptAnalysis, () => {
    if (gptAnalysis.value.length) {
      showAnalysis.value = true;
    } else {
      showAnalysis.value = false;
    }
  });

  function checkTokens(e) {
    tokenLoading.value = true;
    fetch("https://OpenAI-Deepgram-Server.sandrar.repl.co/tokenize", {
      method: "POST",
      body: JSON.stringify({
        string: e,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        tokenLoading.value = false;
        tokenLength.value = data.tokens;
      });
  }

  function sendMainText() {
    loadingGPT.value = true;

    if (mainText.value.length === 0) {
      loadingGPT.value = false;
      alert("Please add a text or transcribe an audio file.");
    } else if (!questionIncrement.value.question1) {
      loadingGPT.value = false;
      alert("Please add a question.");
    } else {
      loadingGPT.value = true;

      fetch("https://OpenAI-Deepgram-Server.sandrar.repl.co/chat", {
        method: "POST",
        body: JSON.stringify({
          messages: messages.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          showAnalysis.value = true;
          loadingGPT.value = false;
          gptAnalysis.value = data.message.content;
        });
    }
  }

  function addQuestions() {
    const prompt = {
      role: "system",
      content: `You will answer ${numInputs.value.toString()} questions about the following text, which is a ${
        textType.value ? textType.value : "document"
      }. Begin each answer to each question with the word Answer.`,
    };
    const main = { role: "user", content: mainText.value };
    messages.value.push(prompt);
    messages.value.push(main);

    for (const property in questionIncrement.value) {
      num++;
      questions.value += `Question ${num}: ${questionIncrement.value[property]}`;
    }

    messages.value.push({ role: "user", content: questions.value });
    sendMainText();
  }

  const formattedAnalysis = computed(() => {
    let formatted = gptAnalysis.value.split("Answer");
    formatted.shift();
    return formatted;
  });

  return {
    mainText,
    textType,
    numInputs,
    questionIncrement,
    messages,
    sendMainText,
    addQuestions,
    checkTokens,
    tokenLength,
    tokenLoading,
    gptAnalysis,
    loadingGPT,
    formattedAnalysis,
    showAnalysis,
  };
});

import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useContentStore = defineStore("content", () => {
  const mainText = ref("");
  const textType = ref("");
  const numInputs = ref(1);
  const score = ref({});
  const questions = ref("");
  const messages = ref([]);
  const tokenLength = ref(0);
  const tokenLoading = ref(false);
  const gptAnalysis = ref("");
  const loadingGPT = ref(false);

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
        console.log(data);
        loadingGPT.value = false;
        gptAnalysis.value = data.message.content;
      });
  }

  function addQuestions() {
    const prompt = {
      role: "system",
      content: `You will answer ${numInputs.value.toString()} questions about the following text, which is a ${
        textType.value
      }`,
    };
    const main = { role: "user", content: mainText.value };
    messages.value.push(prompt);
    messages.value.push(main);

    for (const property in score.value) {
      let num = 0;
      num++;
      questions.value += `Question ${num}: ${score.value[property]}`;
    }

    messages.value.push({ role: "user", content: questions.value });
    sendMainText();
  }

  return {
    mainText,
    textType,
    numInputs,
    score,
    messages,
    sendMainText,
    addQuestions,
    checkTokens,
    tokenLength,
    tokenLoading,
    gptAnalysis,
    loadingGPT,
  };
});

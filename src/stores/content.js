import { ref, computed } from "vue";
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
  const singleAnswer = ref(false);
  let num = 0;

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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function sendPrompt() {
    // loadingGPT.value = true;

    if (mainText.value.length === 0) {
      // loadingGPT.value = false;
      alert("Please add a text or transcribe an audio file.");
    } else if (!questionIncrement.value.question1) {
      // loadingGPT.value = false;
      alert("Please add a question.");
      messages.value = [];
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
    if (mainText.value) {
      sendPrompt();
    } else {
      alert("Please add a text or transcribe an audio file.");
      messages.value = [];
    }
  }

  const formattedAnalysis = computed(() => {
    if (gptAnalysis.value.includes("Answer")) {
      singleAnswer.value = false;
      console.log("contains Answer", gptAnalysis.value.includes("Answer"));
      let formatted = gptAnalysis.value.split("Answer");
      formatted.shift();
      return formatted;
    } else {
      singleAnswer.value = true;
      return gptAnalysis.value;
    }
  });

  return {
    mainText,
    textType,
    numInputs,
    questionIncrement,
    messages,
    sendPrompt,
    addQuestions,
    checkTokens,
    tokenLength,
    tokenLoading,
    gptAnalysis,
    loadingGPT,
    formattedAnalysis,
    singleAnswer,
  };
});

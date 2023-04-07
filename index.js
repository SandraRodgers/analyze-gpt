const envConfig = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const bodyParser = require("body-parser");

const port = 3000;
const { encode } = require("gpt-3-encoder");
const app = express();
app.use(cors());
app.use(bodyParser.json());

//////////// Deepgram Configuration ////////////
const { Deepgram } = require("@deepgram/sdk");
const deepgram = new Deepgram(process.env.DG_API);

// app.use(express.static("static"));

//////////// OpenAI Configuration ////////////
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API,
});
const openai = new OpenAIApi(configuration);

// DEEPGRAM ENDPOINT
app.post("/dg-transcription", upload.single("file"), async (req, res) => {
  // const dgTime = process.hrtime();
  console.log(req.body);
  try {
    const dgResponse = await deepgram.transcription.preRecorded(
      {
        buffer: req.file.buffer,
        mimetype: req.file.mimetype,
      },
      {
        punctuate: true,
        tag: ["sandra"],
        tier: "enhanced",
      }
    );
    // const timerEnd = process.hrtime(dgTime);

    res.send({ apiCall: dgResponse });
  } catch (e) {
    console.log("error", e);
  }
});

//////////// ENDPOINT - tokenize ////////////
app.post("/tokenize", async (req, res) => {
  const str = req.body.string;
  try {
    if (str == null) {
      throw new Error("No string was provided");
    }
    const encoded = encode(str);
    const length = encoded.length;
    console.log("Token count is " + length);
    return res.status(200).json({
      success: true,
      tokens: length,
    });
  } catch (error) {
    console.log(error.message);
  }
});

//////////// ENDPOINT - chat with the AI ////////////
app.post("/chat", async (req, res) => {
  const messages = req.body.messages;
  console.log(messages);
  try {
    if (messages == null) {
      throw new Error("We have a problem - no prompt was provided");
    }
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });
    const completion = response.data.choices[0].message;
    console.log(completion);
    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const envConfig = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const multer = require("multer");
const upload = multer();

const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

////// OpenAI config //////
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API,
});
const openai = new OpenAIApi(configuration);

////// Deepgram config //////
const { Deepgram } = require("@deepgram/sdk");
const deepgram = new Deepgram(process.env.DG_API);

////// Token Counter //////
const { encode } = require("gpt-3-encoder");

// DEEPGRAM transcription
app.post("/dg-transcription", upload.single("file"), async (req, res) => {
  try {
    const dgResponse = await deepgram.transcription.preRecorded(
      {
        buffer: req.file.buffer,
        mimetype: req.file.mimetype,
      },
      {
        punctuate: true,
        model: "nova",
      }
    );
    res.send({ apiCall: dgResponse });
  } catch (e) {
    console.log("error", e);
  }
});

// Token counter
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

// Openai chat completion
app.post("/chat", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    if (prompt == null) {
      throw new Error("We have a problem - no prompt was provided");
    }
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: prompt,
    });
    const completion = response.data.choices[0].message;
    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

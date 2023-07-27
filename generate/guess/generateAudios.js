import fs from "fs";
import { elevenLabsRequest, clearDirectory, delay } from "../audio.js";

const json = JSON.parse(fs.readFileSync("../configs/guess.json"));

const title = json["title"];
const words = json["words"];

const apiKey = "09e3c7956e9dc7c64a12a73b9de5f040"; // 59928a78565d380a4d539961138cef22
const voiceID = "EXAVITQu4vr4xnSDxMaL";

if (clearDirectory("../public/guess/words")) {
  for (const word of words) {
    await delay(2000);
    elevenLabsRequest(apiKey, voiceID, word, `../public/guess/words/${word}.mp3`);
  }
};

import fs from "fs";
import { elevenLabsRequest, clearDirectory, delay } from "../audio.js";

const json = JSON.parse(fs.readFileSync("../configs/choice.json"));

const apiKey = "59928a78565d380a4d539961138cef22";
const voiceID = "pNInz6obpgDQGcFmaJgB";

if (clearDirectory("../public/choice/phrases")) {
  for (const choice of json) {
    const choiceOne = choice[0].choice;
    const choiceTwo = choice[1].choice;

    const path = `../public/choice/phrases/${choiceOne}.mp3`;
    const text = `${choiceOne} ou ${choiceTwo}`;

    await delay(2000);
    elevenLabsRequest(apiKey, voiceID, text, path).then(r => console.log(r));
  }
}

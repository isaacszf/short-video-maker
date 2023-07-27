import axios from "axios";
import path from "path";
import fs from "fs";

export const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const elevenLabsRequest = async (apiKey, voiceID, text, filename) => {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}`;
  const response = await axios({
    method: "POST",
    url,
    data: {
      text,
      voice_settings: {
        stability: 1,
        similarity_boost: 1
      },
      model_id: "eleven_multilingual_v1",
    },
    headers: {
      'Accept': 'audio/mpeg',
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    responseType: "stream",
  });

  response.data.pipe(fs.createWriteStream(filename));
  return { status: "ok" };
}

export const clearDirectory = dir => {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(dir, file), (err) => { if (err) throw err });
    }
  });

  return true;
}

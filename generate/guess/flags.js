import axios from "axios";
import fs from "fs";
import { parse } from "node-html-parser";

// Functions
// / Utils
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const fetchData = async url => {
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (err) {
    throw err;
  }
}

// / Flags
const getFlagsHref = root =>
  root.querySelectorAll("a")
    .filter(anchor => {
      const cases = ["dos", "das", "do", "da", "de"];
      return cases.some(c => anchor.attrs.href.includes(`Bandeira_${c}`));
    })
    .filter(anchor => {
      const cases =
        ["Ilha",
          "Ilhas",
          "Nova Caledónia",
          "República Turca de Chipre do Norte",
          "Antilhas Neerlandesas",
          "Pitcairn", "Guernsey", "Estados Federados da Micronésia", "Brasil"];
      return cases.every(c => !anchor.attrs.href.includes(c));
    })
    .map(anchor => {
      return [anchor.attrs.title, `https://pt.wikipedia.org/${anchor.attrs.href}`];
    });

const getFlagsTitleAndImage = async (root, numElements) => {
  let parsedLinks = [];
  const links = shuffleArray(getFlagsHref(root)).slice(0, numElements);

  for (const [title, link] of links) {
    const parsedTitle = title.split(' ').slice(2).join(" ");

    const data = await fetchData(link);
    const root = parse(data);

    let img = root.querySelector(`img[alt*="Bandeira"]`);
    img === null ? img = root.querySelector("a.image img") : img;

    if (img !== null) {
      parsedLinks.push([parsedTitle, `https:${img.attrs.src}`]);
      console.log(`[SUCCESS] -  "${title}"`);
    } else {
      console.log(`[FAILURE] -  "${title}"`);
    }
  }

  return parsedLinks;
}

// / Json
const updateJson = (updatedJson, path) => {
  const file = JSON.parse(fs.readFileSync(path, 'utf-8'));

  file.title = "ADIVINHE A BANDEIRA";
  file.words = updatedJson.words;
  file.images = updatedJson.images;

  fs.writeFileSync(path, JSON.stringify(file), 'utf-8');
}

// Finalization
const flagsUrl = "https://pt.wikipedia.org/wiki/Categoria:Bandeiras_nacionais";

const data = await fetchData(flagsUrl);
const root = parse(data);

console.log("Getting flags...");

const flags = await getFlagsTitleAndImage(root, 5);

const result = {
  words: [],
  images: [],
}

flags.forEach(flag => {
  result.words.push(flag[0]);
  result.images.push(flag[1]);
});

console.log("\nSaving to json file...");

updateJson(result, "../configs/guess.json");

console.log("Populated file with success!");

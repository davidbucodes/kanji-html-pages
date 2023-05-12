const kanji = require("./kanji.json");
const hirakanaToKatakanaDict = require("./hirakanaToKatakanaDict.json");
const fs = require("fs");

function filterKanjiByLevel(jlptLevelToFilter) {
  return ([k, v]) => v.jlpt_new == jlptLevelToFilter;
}
console.log(hirakanaToKatakanaDict);
function convertToKata(reading) {
  return reading
    .split("")
    .map((letter) => hirakanaToKatakanaDict[letter])
    .join("");
}

function getOnReadings(readingsList) {
  return readingsList.map((reading) => convertToKata(reading));
}

const kanjiEntries = Object.entries(kanji);
const levels = [5, 4, 3];

for (const level of levels) {
  let filteredKanji = kanjiEntries.filter(filterKanjiByLevel(level));
  filteredKanji = filteredKanji.map(([k, v]) => {
    const newV = { ...v, readings_on: getOnReadings(v.readings_on) };
    return [k, newV];
  });
  fs.writeFileSync(
    `./kanji-n${level}.js`,
    `const kanjis = ${JSON.stringify(filteredKanji, null, 4)}`,
    {
      encoding: "utf-8",
    }
  );
}

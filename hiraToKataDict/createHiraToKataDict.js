const { writeFileSync } = require("fs");
const hiras = require("./hiragana.json");
const katas = require("./katakana.json");

const hirakanaToKatakanaDict = hiras.reduce((reducer, currHira) => {
  const currKata = katas.find((kata) => kata.roumaji === currHira.roumaji);
  reducer[currHira.kana] = currKata.kana;
  return reducer;
}, {});
writeFileSync(
  "../hirakanaToKatakanaDict.json",
  JSON.stringify(hirakanaToKatakanaDict, null, 4),
  {
    encoding: "utf-8",
  }
);

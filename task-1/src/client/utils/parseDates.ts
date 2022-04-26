// My own implementation of regex for gregorian date validation
// Was written in first place as a solution to
// https://www.codewars.com/kata/5ab23a9c1cec39668c000055

// Original regex can be found here
// https://www.codewars.com/kata/reviews/5ab26313ead1e92a21000bf4/groups/5fe1e9d8911ffb00011571ef

const datePattern = /(?<day>0[1-9]|1\d|2\d(?=\.02\.(?:(?:\d\d(?:[02468](?:(?<!0)0|[48])|[13579][26]))|(?:[02468][048]|[13579][26])00))|2[0-8](?=\.02)|(?:2\d|30)(?!\.02)|31(?=\.(?:0[13578]|1[02])))\.(?<month>0[1-9]|1[0-2])\.(?<year>\d{3}(?<=(?:[1-9]\d\d|\d[1-9]\d|\d\d[1-9]))\d|\d{3}[1-9])/gm;

// Parses gregorian calendar date in format dd.mm.yyyy
export const parseDates = (source: string) => {
  const res = source.match(datePattern);

  return res === null ? [] : Array.from(res);
}

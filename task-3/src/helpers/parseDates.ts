const datePattern = /(?<month>\d|\d{2})\/(?<day>\d|\d{2})\/(?<year>\d+)/gm;

const isDateValid = (dateMatch: RegExpMatchArray) => {
  const year = +dateMatch.groups!.year;
  const month = +dateMatch.groups!.month - 1;
  const day = +dateMatch.groups!.day;

  const dateObj = new Date(year, month, day);

  return (
    dateObj.getFullYear() === year &&
    dateObj.getMonth() === month &&
    dateObj.getDate() === day
  );
}

// Parses gregorian calendar date in format mm/dd/yyyy
export const parseDates = (source: string) => {
  const res = Array.from(source.matchAll(datePattern))
    .filter(isDateValid)
    .map(match => match[0]);


  return res;
}

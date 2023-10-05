export function toFarsiNumber(n) {
  if (n === null) {
    return null;
  }
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
}

export function formatPersianDate(date) {
  const persianDigit = toFarsiNumber(date);
  return persianDigit.toString().replace(/-/g, () => '/');
}

export function fFaToEnNumber(number) {
  function FaToEnChar(char) {
    const farsiChars = {
      '\u0660': 0,
      '\u0661': 1,
      '\u0662': 2,
      '\u0663': 3,
      '\u0664': 4,
      '\u0665': 5,
      '\u0666': 6,
      '\u0667': 7,
      '\u0668': 8,
      '\u0669': 9,
      '\u06F0': 0,
      '\u06F1': 1,
      '\u06F2': 2,
      '\u06F3': 3,
      '\u06F4': 4,
      '\u06F5': 5,
      '\u06F6': 6,
      '\u06F7': 7,
      '\u06F8': 8,
      '\u06F9': 9,
    };

    if (char in farsiChars) return farsiChars[char];
    return char;
  }

  const string = number.split('');
  const enChar = string.map((s) => FaToEnChar(s));
  return enChar.join('');
}

export function fFaStringToEnDigit(str) {
  if (!str) return null;
  // eslint-disable-next-line no-bitwise
  return Number(str.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, (a) => a.charCodeAt(0) & 0xf));
}

export function fGradeToStringFormat(grade) {
  const classes = {
    5: 'پنجم',
    6: 'ششم',
    4: 'چهارم',
  };

  return classes[grade];
}

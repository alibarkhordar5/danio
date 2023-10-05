export const persian_numbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
export const english_numbers = {
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
};

export const getPersianNumber = (number) => {
  const digits = number ? number.toString().split('') : ['۰'];
  const result = digits.map((digit) =>
    digit === '.' || digit === '٫' ? '٫' : !isNaN(parseInt(digit)) ? persian_numbers[digit] : digit
  );
  return result.join('');
};

export const getLatinNumber = (number) => {
  const digits = number ? number.toString().split('') : ['0'];
  const result = digits.map((digit) => (digit === '٫' || digit === '.' ? '.' : english_numbers[digit]));
  // console.log('result:',result,'number',number)
  return result.join('');
};

const toLatinDigit = (digit) => {
  const code = digit.charCodeAt(0);
  // convert if it is a persian digit ۰-۹ (1776 to 1785 unicode):
  if (1776 <= code && code <= 1785) {
    return String(code - 1776);
  }
  // convert if it is an arabic digit ٠-٩ (1632 to 1641 unicode):
  if (1632 <= code && code <= 1641) {
    return String(code - 1632);
  }
  // otherwise:
  return digit;
};

export const getTimeInMinutes = (seconds) => {
  const minutes = seconds ? (seconds > 60 ? Math.floor(seconds / 60) : 1) : 0;
  return minutes;
};

export const convertDigitsToPersian = (string, convertDelim) => {
  let ret = '';
  if (string != null) {
    ret = string.toString().replace(/[0-9]/g, getPersianNumber);
  }
  if (convertDelim) {
    ret = ret.replace('.', '٫');
  }
  return ret;
};

export const convertDigitsToLatin = (string, convertDelim) => {
  // console.log(String(string),'match:',string.toString().match(/[۰۱۲۳۴۵۶۷۸۹]/g))
  let ret = string.toString().replace(/[۰-۹٠-٩]/g, toLatinDigit);
  if (convertDelim) {
    ret = ret.replace('٫', '.');
  }
  return ret;
};

export function isDev() {
  return process.env.NODE_ENV === 'development';
}

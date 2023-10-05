import { format, getTime, formatDistanceToNow } from 'date-fns';
import { toFarsiNumber } from './format-number-persian';
// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function fPersianDate(date) {
  const persianDigit = toFarsiNumber(date);
  return persianDigit.toString().replace(/-/g, () => '/');
}

export function fPersianTime(time) {
  const persianDigit = toFarsiNumber(time);
  return persianDigit.toString().replace(/-/g, () => ':');
}

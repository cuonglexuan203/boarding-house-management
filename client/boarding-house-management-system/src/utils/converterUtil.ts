export function isNumeric(n: any) {
  return !isNaN(parseFloat(n));
}

export function getReadableNumber(
  n: string | number,
  locale?: string,
): string | number {
  return isNumeric(n) ? (n as number).toLocaleString(locale) : NaN;
}
// Can be NaN
export const parseNumber = (readabledNumber: string) => {
  // Remove non-numeric characters (such as thousands separators or currency symbols)
  const numericString = readabledNumber.replace(/[^\d.-]/g, '');

  // Parse the numeric string into a number
  const number = parseFloat(numericString);

  // Check if the number is valid
  // if (isNaN(number)) {
  //   return NaN;
  // }

  return number;
};

// Can not be NaN
export const parseOnlyNumber = (
  readabledNumber: string,
  defaultValue: number = 0,
) => {
  const parsedNumber = parseNumber(readabledNumber);
  return isNaN(parsedNumber) ? defaultValue : parsedNumber;
};

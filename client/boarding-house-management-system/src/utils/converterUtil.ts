export function isNumeric(n: any) {
  return !isNaN(parseFloat(n));
}

export function getFormattedNumber(n: string | number): string | number {
  return isNumeric(n) ? (n as number).toLocaleString('vi-VN') : NaN;
}
export const parseReadableNumber = (formattedNumber: string) => {
  // Remove non-numeric characters (such as thousands separators or currency symbols)
  const numericString = formattedNumber.replace(/[^\d.-]/g, '');

  // Parse the numeric string into a number
  const number = parseFloat(numericString);

  // Check if the number is valid
  if (isNaN(number)) {
    return NaN;
  }

  return number;
};

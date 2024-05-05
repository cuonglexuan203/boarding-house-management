export function isNumeric(n: any) {
  return !isNaN(parseFloat(n));
}

export function getFormattedNumber(n: any): string | number {
  return isNumeric(n) ? (n as number).toLocaleString('vi-VN') : NaN;
}

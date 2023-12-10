export function getUiAmount(number: number, tokenDecimal: number) {
  return number / Math.pow(10, tokenDecimal);
}
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function getAmount(number: number, tokenDecimal: number) {
    return number *  Math.pow(10, tokenDecimal);
  }
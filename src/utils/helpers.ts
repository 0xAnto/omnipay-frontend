export function getUiAmount(number: number, tokenDecimal: number) {
    return number / Math.pow(10, tokenDecimal);
  }
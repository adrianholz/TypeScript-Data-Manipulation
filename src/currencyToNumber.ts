/**
 * Receives a value '1.200,50' and returns number: 1200.50
 */

export default function currencyToNumber(currency: string): number | null {
  const number = Number(currency.replaceAll(".", "").replace(",", "."));
  return isNaN(number) ? null : number;
}

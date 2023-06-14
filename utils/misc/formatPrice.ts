export function formatPrice(rawPrice: number, currency: string) {
  let formattedPrice = new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 2,
  }).format(Number(rawPrice));

  return `${currency} ${formattedPrice}`;
}

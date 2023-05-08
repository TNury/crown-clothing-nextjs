export function formatPrice(rawPrice, currency) {
  let formattedPrice = new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 2,
  }).format(Number(rawPrice));

  return `${currency} ${formattedPrice}`;
}
